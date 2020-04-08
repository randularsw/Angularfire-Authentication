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
  user;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser();
    this.authService.user.subscribe(user => {
      if (user) {
        console.log(user.uid);
        this.user = user;
      }
    },
      err => {
        console.log(err);
      });
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.SignOut();
    this.user=null;
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
