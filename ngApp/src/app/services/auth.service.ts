import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigAuthService } from "./config/config.auth.service";

@Injectable()
export class AuthService {

  private readonly _urls;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigAuthService) {

    this._urls = this._config.getUrls();
  }

  registerUser(user) {
    return this.http.post<any>(this._urls["register"], user);
  }

  loginUser(user) {
    return this.http.post<any>(this._urls["login"], user);
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
