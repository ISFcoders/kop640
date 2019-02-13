import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigEventService } from "./config/config.event.service";

@Injectable()
export class EventService {

  private readonly _urls;

  constructor(private http: HttpClient,
              private _config: ConfigEventService) {

    this._urls = this._config.getUrls();
  }

  getEvents() {
    return this.http.get<any>(this._urls["events"]);
  }

  getSpecialEvents() {
    return this.http.get<any>(this._urls["special"]);
  }
}
