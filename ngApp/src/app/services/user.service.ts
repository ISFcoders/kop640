import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigUserService } from "./config/config.user.service";

@Injectable()
export class UserService {

  private readonly _urls;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigUserService) {

    this._urls = this._config.getUrls();
  }

  getUserInfo(user) {
    return this.http.post<any>(this._urls["user"], user);
  }
}

