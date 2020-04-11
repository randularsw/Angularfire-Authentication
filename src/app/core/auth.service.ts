import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";
import { auth } from "firebase/app";

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { User } from "./models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user = afAuth.authState;
  }

  // google
  login() {
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
                photo: cred.user.photoURL
              });
            }
          });
      }
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Successfully signed up!", res);
      })
      .catch((error) => {
        console.log("Something is wrong:", error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Successfully signed in!");
        console.log(res);
      })
      .catch((err) => {
        console.log("Something is wrong:", err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.afAuth.signOut();
  }
}
