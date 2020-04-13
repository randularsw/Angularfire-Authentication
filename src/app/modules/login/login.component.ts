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
  // user;
  loginModel = new User();
  regModel = new User();

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    // this.authService.user.subscribe(user => {
    //   if (user) {
    //     console.log(user.uid);
    //     this.user = user;
    //   }
    // },
    //   err => {
    //     console.log(err);
    //   });
  }

  onGoogleLogin() {
    this.authService.googleLogin();
  }

  onRegister() {
    this.authService.register(this.regModel);
    
  }

  onLogin() {
    this.authService.login(this.loginModel);
  }

  onLogout() {
    this.authService.logout();
  }
}
