import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUserExists = false;
  registerUserData = { };

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() { }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          this.registeredUserExists = false;
          localStorage.setItem('token', res.token);
          this._router.navigate(['/main']);
        },
        err => {
          if (err.status === 401) {
            if (err.error === "User exists") {
              this.registeredUserExists = true;
            }
          }
          console.log(err);
        }
      );
  }

}
