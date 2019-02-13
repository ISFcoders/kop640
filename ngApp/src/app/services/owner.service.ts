import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigOwnerService } from "./config/config.owner.service";

@Injectable()
export class OwnerService {

  private readonly _urls;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigOwnerService ) {

    this._urls = this._config.getUrls();
  }

  getAdminList() {
    return this.http.post<any>(this._urls["adminlist"], {});
  }
  getUsersList() {
    return this.http.post<any>(this._urls["userslist"], {});
  }
  addAdmin(username) {
    return this.http.post<any>(this._urls["owneradmin"], username);
  }
}
