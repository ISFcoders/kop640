import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from "./config.service";

@Injectable()
export class UserService {

  private readonly _userUrl;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigService) {

    this._userUrl = this._config.getApiUser();
  }

  getUserInfo(user) {
    return this.http.post<any>(this._userUrl, user);
  }
}

