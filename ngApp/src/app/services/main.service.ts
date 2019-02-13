import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigMainService } from "./config/config.main.service";

@Injectable()
export class MainService {

  private readonly _urls;

  constructor(private http: HttpClient,
              private _router: Router,
              private _config: ConfigMainService ) {

    this._urls = this._config.getUrls();
  }

  getData() {
    return this.http.get<any>(this._urls["datatable"]) ;
  }
}



