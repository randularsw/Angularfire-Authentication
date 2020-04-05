import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { auth } from 'firebase/app';

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
  }

  getCurrentUser() {
    let user = this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.uid);
        console.log(user.providerData);
        console.log(user.photoURL);
      } else {
        console.log('No user logged in');
      }
    });
  }

  // google
  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(user=>{
      // console.log(user);
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword("qwerty@uiop.com", "password")
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword("qwerty@uiop.com", "password")
      .then(res => {
        console.log('Successfully signed in!');
        console.log(res);

      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.afAuth
      .signOut();
  }  
}
