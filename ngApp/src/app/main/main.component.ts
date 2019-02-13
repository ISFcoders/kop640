import { Component, OnInit } from '@angular/core';
import { MainService } from "../services/main.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public name: string;
  public symbol: string;
  public decimals: number;
  public addressContract: string;
  public balanceEtherContract: number;
  public datatab: string

  constructor(private _mainService: MainService) { }

  ngOnInit() {
    this.name = 'NAME';
    this.symbol = 'SYMBOL';
    this.decimals = 0;
    this.addressContract = '0x000';
    this.balanceEtherContract = 0;

    this.datatab = '_';
    this._mainService.getData()
      .subscribe(
        res => {
          this.datatab = "";
          res.list.forEach(elem => {
            this.datatab += elem.data + " ";
          });

        },
        err => console.log(err)
      );
  }
}
