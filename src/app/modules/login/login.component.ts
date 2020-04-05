import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from 'src/app/core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  uid;
  
  constructor(public auth: AngularFireAuth, private authService:AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser();
  }

  getCurrentUser() {
    let user = this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        console.log(user.displayName);  
        console.log(user.photoURL);
        console.log(user.providerData);
      } else {
        console.log('No user logged in');
      }
    });
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.SignOut();
  }



  signUp() {
    this.authService.SignUp(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  signIn() {
    this.authService.SignIn(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  signOut() {
    this.authService.SignOut();
  }

}
