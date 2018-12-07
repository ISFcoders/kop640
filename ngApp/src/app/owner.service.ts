import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from "./config.service";

@Injectable()
export class OwnerService {

  private readonly _adminListUrl;
  private readonly _usersListUrl;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigService ) {

    this._adminListUrl = this._config.getOwnerAdminListUrl();
    this._usersListUrl = this._config.getOwnerUsersListUrl();
  }

  getAdminList() {
    return this.http.post<any>(this._adminListUrl, {});
  }

  getUsersList() {
    return this.http.post<any>(this._usersListUrl, {});
  }
}
