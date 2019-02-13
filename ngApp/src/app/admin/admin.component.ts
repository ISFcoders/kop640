import { Component, OnInit } from '@angular/core';
import { EthcontractService } from '../services/ethcontract/ethcontract.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public yourAccount: string;
  public listRoles: string[];
  public listRolesLength: number;
  public roles = ['owner', 'superuser', 'admin', 'whitelister', 'locker', 'corrector'];
  public message: string;
  public showMessage: boolean;
  public showTx: boolean;
  public txHash: string;

  constructor(private service: EthcontractService) {
  }

  ngOnInit() {
    this.service.showAccount().then(result => this.yourAccount = result);
    this.service.getRoles(this.roles).then(result => {
      this.listRoles = result;
      this.listRolesLength = this.listRoles.length;
    });
  }

  showMessageFalse() {
    this.showMessage = false;
  }

  showTxFalse() {
    this.showTx = false;
  }

  balanceOf(addr: string) {
    this.service.balanceOf(addr).then(result => {
      this.showMessage = true;
      this.message = `Balance (${addr}): ${result}`;
    }, err => {
      alert(err);
    });
  }

  lockedtokensOf(addr: string) {
    this.service.lockedtokensOf(addr).then(result => {
      this.showMessage = true;
      this.message = `Loked tokens (${addr}): ${result}`;
    }, err => {
      alert(err);
    });
  }

  notesOf(addr: string) {
    this.service.notesOf(addr).then(result => {
      this.showMessage = true;
      this.message = `Note (${addr}): ${result}`;
    }, err => {
      alert(err);
    });
  }

  depositsOf(addr: string) {
    this.service.depositsOf(addr).then(result => {
      this.showMessage = true;
      this.message = `Deposits in Wei (${addr}): ${result}`;
    }, err => {
      alert(err);
    });
  }

  whitelist(addr: string) {
    this.service.whitelist(addr).then(result => {
      this.showMessage = true;
      this.message = `Whitelist (${addr}): ${result}`;
    }, err => {
      alert(err);
    });
  }

  allowance(owner: string, spender: string) {
    this.service.allowance(owner, spender).then(result => {
      this.showMessage = true;
      this.message = `Allowance for (${spender}): ${result}`;
    }, err => {
      alert(err);
    });
  }

  transfer(addr: string, value: number) {
    this.service.transfer(addr, value).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  transferFrom(from: string, to: string, value: number) {
    this.service.transferFrom(from, to, value).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  approve(spender: string, value: number) {
    this.service.approve(spender, value).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  increaseApproval(spender: string, value: number) {
    this.service.increaseApproval(spender, value).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  decreaseApproval(spender: string, value: number) {
    this.service.decreaseApproval(spender, value).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }


  addAddressToWhitelist(addr: string) {
    this.service.addAddressToWhitelist(addr).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      alert(err);
    });
  }

  removeAddressFromWhitelist(addr: string) {
    this.service.removeAddressFromWhitelist(addr).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      alert(err);
    });
  }

  lockTokens(holder: string, value: number, txt: string) {
    this.service.lockTokens(holder, value, txt).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  unLockTokens(holder: string, value: number, txt: string) {
    this.service.unLockTokens(holder, value, txt).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  moveTokens(holder: string, newholder: string, value: number, txt: string) {
    this.service.moveTokens(holder, newholder, value, txt).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

  burnTokens(holder: string, value: number, txt: string) {
    this.service.burnTokens(holder, value, txt).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log('Ошибка: ' + err);
    });
  }

}
