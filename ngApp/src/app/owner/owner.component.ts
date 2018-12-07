import { Component, OnInit } from '@angular/core';
import { OwnerService } from "../owner.service";
import { EthcontractService } from '../ethcontract.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  admins = [];
  users = [];

  public ownerAddr: number;
  public yourAddr: string;
  public message: string;
  public showMessage: boolean;
  public showTx: boolean;
  public txHash: string;

  constructor(private _ownerService: OwnerService, private service: EthcontractService) { }

  ngOnInit() {
    this.service.showAccount().then(result => this.yourAddr = result);
    this.service.owner().then(reuslt => this.ownerAddr = reuslt);
    this._ownerService.getAdminList()
      .subscribe(
        res => {
          this.admins = res.list;
        },
        err => console.log(err)
      );
    this._ownerService.getUsersList()
      .subscribe(
        res => {
          this.users = res.list;
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

  transferOwnership(addr: string) {
    this.service.transferOwnership(addr).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log(err);
    });
  }

  isSuperuser(addr: string) {
    this.service.isSuperuser(addr).then(result => {
      this.showMessage = true;
      if (result) {
        this.message = 'Владелец адреса является Superuser';
      } else {
        this.message = 'Не Superuser';
      }
    }, err => {
      console.log(err);
    });
  }

  hasRole(addr: string, roleName: string) {
    this.service.hasRole(addr, roleName).then(result => {
      this.showMessage = true;
      if (result) {
        this.message = 'Владелец адреса является Superuser';
      } else {
        this.message = 'Не Superuser';
      }
    }, err => {
      console.log(err);
    });
  }

  adminAddRole(addr: string, roleName: string) {
    this.service.adminAddRole(addr, roleName).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log(err);
    });
  }

  adminRemoveRole(addr: string, roleName: string) {
    console.log(addr);
    this.service.adminRemoveRole(addr, roleName).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log(err);
    });
  }

  getEther(valueWei: number) {
    this.service.getEther(valueWei).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log(err);
    });
  }

  correctOffers(addr: string) {
    this.service.correctOffers(addr).then(result => {
      this.showTx = true;
      this.txHash = result;
    }, err => {
      console.log(err);
    });
  }
}
