import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";

@Injectable()
export class ConfigOwnerService extends ConfigService {

  private _adminList;
  private _usersList;
  private _ownerAdmin;

  constructor() {
    super();
    this._adminList = this.getBaseUrl() + "/api/adminlist";
    this._usersList = this.getBaseUrl() + "/api/userlist";
    this._ownerAdmin = this.getBaseUrl() + "/api/owneradminupd"; // Owner: add/remove admin
  }

  getUrls() {
    return {
      "adminlist": this._adminList,
      "userslist": this._usersList,
      "owneradmin": this._ownerAdmin
    };
  }
}
