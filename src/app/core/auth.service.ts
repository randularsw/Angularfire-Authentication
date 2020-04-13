import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";
import { auth } from "firebase/app";

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // user: Observable<any>;
  user;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    // this.user = afAuth.authState;
    afAuth.authState.subscribe(
      (user) => {
        if (user) {
          this.db
            .collection("users")
            .doc(user.uid)
            .valueChanges()
            .subscribe((x) => {
              if (x) {
                this.user = x;
              }
            });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // google
  googleLogin() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((cred) => {
      if (cred.user) {
        console.log("logged in user id", cred.user.uid);
        this.db
          .collection("users")
          .doc(cred.user.uid)
          .valueChanges()
          .subscribe((x) => {
            console.log("user in the db", x);
            if (!x) {
              // user not in the db -> create new user
              this.db.collection("users").doc(cred.user.uid).set({
                name: cred.user.displayName,
                email: cred.user.email,
              });
            }
          });
      }
    });
  }

  /* Sign up */
  register(userDetails) {
    this.afAuth
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((cred) => {
        if (cred.user) {
          console.log("logged in user id", cred.user.uid);
          this.db
            .collection("users")
            .doc(cred.user.uid)
            .valueChanges()
            .subscribe((x) => {
              console.log("user in the db", x);
              if (!x) {
                // user not in the db -> create new user
                this.db.collection("users").doc(cred.user.uid).set({
                  name: userDetails.name,
                  email: cred.user.email,
                });
              }
            });
        }
      });
  }

  /* Sign in */
  login(userDetails) {
    this.afAuth
      .signInWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  /* Sign out */
  logout() {
    this.afAuth.signOut();
    this.user = null;
  }
}
