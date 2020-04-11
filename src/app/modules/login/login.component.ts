import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from 'src/app/core/auth.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user;
  loginModel = new User();
  regModel = new User();

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
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

  loginWithGoogle() {
    this.authService.login();
  }

  register() {
    this.authService.SignUp(this.regModel.email, this.regModel.password);
  }

  login() {
    this.authService.SignIn(this.loginModel.email, this.loginModel.password);
  }

  logout() {
    this.authService.SignOut();
    this.user=null;
  }
}
