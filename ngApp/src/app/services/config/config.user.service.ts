import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";

@Injectable()
export class ConfigUserService extends ConfigService {

  private _user;

  constructor() {
    super();
    this._user = this.getBaseUrl() + "/api/user";
  }

  getUrls() {
    return {
      "user": this._user
    };
  }
}
