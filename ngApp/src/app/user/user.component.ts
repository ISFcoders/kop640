import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { EthcontractService } from '../services/ethcontract/ethcontract.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public yourAccount: string;
  public yourBalance: number;
  public yourBalanceEther: number;
  public symbolToken: string;
  public listRoles: string[];
  public listRolesLength: number;
  public roles = ['owner', 'superuser', 'admin', 'whitelister', 'locker', 'corrector'];
  public message: string;
  public showMessage: boolean;
  public showTx: boolean;
  public txHash: string;
  public allOffersToSell: any;
  public allOffersToBuy: any;
  public ballanceOfBlock: number;

  user = { };
  name  = '';
  phone = '';
  email = '';
  vallet = '';
  vallets = [ ];
  username = '';
  checked = false;

  constructor(private _userService: UserService, private service: EthcontractService) { }

  ngOnInit() {
    this.service.showAccount().then(account => {
      this.yourAccount = account;
      this.service.balanceOf(account).then(balance => this.yourBalance = balance);
      this.service.getBalance(account).then(result => this.yourBalanceEther = result);
      this.service.getSymbolToken().then(symbol => this.symbolToken = symbol);
      this.service.getRoles(this.roles).then(result => {
        this.listRoles = result;
        this.listRolesLength = this.listRoles.length;
      });
      this.service.getOfferToSell().then(result => {
        // console.log(result);
        this.allOffersToSell = result;
      });
      this.service.getOfferToBuy().then(result => {
        // console.log(result);
        this.allOffersToBuy = result;
      });
    });

    this.user = {
      username: localStorage.getItem('username')
    };

    this._userService.getUserInfo(this.user)
      .subscribe(
        res => {
          this.name = res.name;
          this.phone = res.phone;
          this.email = res.email;
          this.vallets = res.vallets;
          if (res.userstate === 'checked') {
            this.checked = true;
          } else {
            this.checked = false;
          }
          this.username = localStorage.getItem('username');
        },
        err => console.log(err)
      );
  }
    showMessageFalse() {
      this.showMessage = false;
    }

    showTxFalse() {
      this.showTx = false;
    }

    offerToSell(valueLot: number, price: number) {
      this.service.offerToSell(valueLot, price).then(result => {
        this.showTx = true;
        this.txHash = result;
      }, err => {
        console.log('Ошибка: ' + err);
      });
    }

    cancelOfferSell() {
      this.service.cancelOfferSell().then(result => {
        this.showTx = true;
        this.txHash = result;
      }, err => {
        console.log('Ошибка: ' + err);
      });
    }

    offerToBuy(valueLot: number, price: number) {
      this.service.offerToBuy(valueLot, price).then(result => {
        this.showTx = true;
        this.txHash = result;
      }, err => {
        console.log('Ошибка: ' + err);
      });
    }

    cancelOfferBuy() {
      this.service.cancelOfferBuy().then(result => {
        this.showTx = true;
        this.txHash = result;
      }, err => {
        console.log('Ошибка: ' + err);
      });
    }

    dealOfferToSell(payee: string, valueLot: number, valueWei: number) {
      this.service.dealOfferToSell(payee, valueLot, valueWei).then(result => {
        this.showTx = true;
        this.txHash = result;
      }, err => {
        console.log('Ошибка: ' + err);
      });
    }

    dealOfferToBuy(payee: string, valueLot: number) {
      this.service.dealOfferToBuy(payee, valueLot).then(result => {
        this.showTx = true;
        this.txHash = result;
      }, err => {
        console.log('Ошибка: ' + err);
      });
    }

    getBalanceOfBlock(addr: string, block: number) {
      this.service.getBalanceOfBlock(addr, block).then(result => {
        this.showMessage = true;
        this.message = `Balance (${block}): ${result}`;
      });
    }
}
