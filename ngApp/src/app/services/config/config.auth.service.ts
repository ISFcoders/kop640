import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";

@Injectable()
export class ConfigAuthService extends ConfigService {

  private _register;
  private _login;

  constructor() {
    super();
    this._register = this.getBaseUrl() + "/api/auth/register";
    this._login = this.getBaseUrl() + "/api/auth/login";
  }

  getUrls() {
    return {
      "register": this._register,
      "login": this._login
    };
  }
}
