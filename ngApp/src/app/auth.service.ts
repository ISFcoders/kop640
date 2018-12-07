import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from "./config.service";

@Injectable()
export class AuthService {

  private readonly _registerUrl;
  private readonly _loginUrl;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigService) {

    this._registerUrl = this._config.getRegisterUrl();
    this._loginUrl = this._config.getLoginUrl();
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('admin');
    localStorage.removeItem('owner');
    this._router.navigate(['/main']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    return !!localStorage.getItem('admin');
  }

  isOwner() {
    return !!localStorage.getItem('owner');
  }
}
