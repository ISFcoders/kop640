import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLoginOrPassword = false;
  loginUserData = { };

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.invalidLoginOrPassword = false;
    console.log('login.component.ts: loginUser(): ' + this.loginUserData);
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          this.invalidLoginOrPassword = false;

          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('admin', (res.admin === 'true') ? res.admin : '');
          localStorage.setItem('owner', (res.owner === 'true') ? res.owner : '');

          this._router.navigate(['/main']);
        },
        err => {
          if (err.status === 401) {
            if (err.error === "Invalid login or password") {
              this.invalidLoginOrPassword = true;
            }
          }
          console.log(err);
        }
      )
  }

}
