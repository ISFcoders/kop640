import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";

@Injectable()
export class ConfigMainService extends ConfigService {

  private _dataTable;

  constructor() {
    super();
    this._dataTable = this.getBaseUrl() + "/api/krasikov/datatab";
  }

  getUrls() {
    return {
      "datatable": this._dataTable
    };
  }
}
