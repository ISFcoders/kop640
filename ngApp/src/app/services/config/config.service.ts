import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private _host = "127.0.0.1";
  private _port = "3000";

  constructor() {
  }

  getHost() {
    return this._host;
  }

  getPort() {
    return this._port;
  }

  getBaseUrl() {
    return 'http://' + this._host + ":" + this._port;
  }
}
