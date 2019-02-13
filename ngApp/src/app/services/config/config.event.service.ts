import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";

@Injectable()
export class ConfigEventService extends ConfigService {

  private _events;
  private _special;

  constructor() {
    super();
    this._events = this.getBaseUrl() + "/api/events";
    this._special = this.getBaseUrl() + "/api/special";
  }

  getUrls() {
    return {
      "events": this._events,
      "special": this._special
    };
  }
}
