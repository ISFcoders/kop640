import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.name = 'NAME';
    this.symbol = 'SYMBOL';
    this.decimals = 0;
    this.addressContract = '0x000';
    this.balanceEtherContract = 0;
  }
}
