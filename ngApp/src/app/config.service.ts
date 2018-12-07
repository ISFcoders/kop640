import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private _register = "http://127.0.0.1:3000/api/register";
  private _login = "http://127.0.0.1:3000/api/login";
  private _apiUser = "http://127.0.0.1:3000/api/user";
  private _ownerAdminListUrl = "http://127.0.0.1:3000/api/adminlist";
  private _ownerUsersListUrl = "http://127.0.0.1:3000/api/userslist";

  constructor() {
  }

  getRegisterUrl() {
    return this._register;
  }
  getLoginUrl() {
    return this._login;
  }
  getApiUser() {
    return this._apiUser;
  }
  getOwnerAdminListUrl() {
    return this._ownerAdminListUrl;
  }
  getOwnerUsersListUrl() {
    return this._ownerUsersListUrl;
  }
}
