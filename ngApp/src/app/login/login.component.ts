import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "../auth.service";

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
    console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          this.invalidLoginOrPassword = false;
          localStorage.setItem('token', res.token);

          console.log('login:' + res.login);
          localStorage.setItem('login', res.login);

          console.log('admin:' + res.admin);
          if (res.admin === 'true') {
            localStorage.setItem('admin', res.admin);
          } else {
            localStorage.setItem('admin', '');
          }

          console.log('owner:' + res.owner);
          if (res.owner === 'true') {
            localStorage.setItem('owner', res.owner);
          } else {
            localStorage.setItem('owner', '');
          }

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
