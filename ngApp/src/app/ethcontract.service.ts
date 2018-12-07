import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;

const contractAbi = require('./contractAbi02.json');

@Injectable()
export class EthcontractService {
  private _account: string = null;
  private _web3: any;
  private _tokenContract: any;
  private _tokenContractAddress = '0xfcbb10fbc7c0a6ef80abc6bd674ae0254fe3972f';
  private _transactionCount: number;
  private _encodeABI: string;
  private _dataTransfer: any;

  constructor() {
    console.log('web3:');
    if (typeof window.web3 !== 'undefined') {
      console.log('web3 -1');
      this._web3 = new Web3 (window.web3.currentProvider);

    } else {
      console.log('web3 -2');
      this._web3 = new Web3 (new Web3.providers.HttpProvider('http://127.0.0.1:3001'));
    }

    this._tokenContract = this._web3.eth.contract(contractAbi).at(this._tokenContractAddress);
  }
  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise ((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err !== null) {
            alert('There was an error fetching your accounts.');
            return;
          }
          if (accs.lenght === 0) {
            alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
            return;
          }
          resolve(accs[0]);
        });
      }) as string;
      this._web3.eth.defaultAccount = this._account;
      // console.log(this._web3.eth.defaultAccount);
    }
    return Promise.resolve(this._account);
  }

  public async owner(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.owner.call((err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async totalSupply(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.totalSupply.call((err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async getNameToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.name.call((err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async getSymbolToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.symbol.call((err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async getDecimalsToken(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.decimals.call((err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async getAddressContract(): Promise<string> {
    return new Promise((resolve, reject) => {
      const result: string = this._tokenContractAddress;
      if (result !== null) {
        resolve(result);
      }
    }) as Promise<string>;
  }

  public async getAllTransfers(): Promise<any> {
    return new Promise((resolve, reject) => {
      const contractEvents = this._tokenContract.Transfer(
        { address: this._tokenContractAddress },
        { fromBlock: 0, toBlock: 'latest' });
      contractEvents.get((err, logs) => {
        // logs.forEach(log => console.log(log.args));
        resolve(logs);
      });
    }) as Promise<any>;
  }

  public async getOfferToSell(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._tokenContract.OfferToSell( { address: this._tokenContractAddress }, { fromBlock: 0, toBlock: 'latest' }).get((err, logs) => {
        const accounts = {};
        // console.log(logs);
        for (let i = 0; i < logs.length; i++) {
          const log = logs[i];
          accounts[log.args.seller] = 1;
        }
        // console.log(accounts);
        const arrayAccounts = Object.keys(accounts);
        const allOffersToSell = [];
        let loops = 0;
        let index = 0;
        for (let i = 0; i < arrayAccounts.length; i++) {
          this._tokenContract.showOffersToSell(arrayAccounts[i], (err, result) => {
            // console.log(result);
            if (err != null) {
              console.log('Error ' + err);
              reject(err);
            }
            if (result[0]) {
              allOffersToSell[index] = [arrayAccounts[i], result[1], result[2], result[0]];
              ++index;
            }
            ++loops;

            if (loops >= arrayAccounts.length) {
              // console.log(allOffersToSell);
              resolve(allOffersToSell);
            }
          });
        }
      });
    }) as Promise<any>;
  }

  public async getOfferToBuy(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._tokenContract.OfferToBuy( { address: this._tokenContractAddress }, { fromBlock: 0, toBlock: 'latest' }).get((err, logs) => {
        const accounts = {};
        // console.log(logs);
        for (let i = 0; i < logs.length; i++) {
          const log = logs[i];
          accounts[log.args.buyer] = 1;
        }
        // console.log(accounts);
        const arrayAccounts = Object.keys(accounts);
        const allOffersToBuy = [];
        let loops = 0;
        let index = 0;
        for (let i = 0; i < arrayAccounts.length; i++) {
          this._tokenContract.showOffersToBuy(arrayAccounts[i], (err, result) => {
            // console.log(result);
            if (err != null) {
              console.log('Error ' + err);
              reject(err);
            }
            if (result[0]) {
              allOffersToBuy[index] = [arrayAccounts[i], result[1], result[2], result[0]];
              ++index;
            }
            ++loops;

            if (loops >= arrayAccounts.length) {
              // console.log(allOffersToBuy);
              resolve(allOffersToBuy);
            }
          });
        }
      });
    }) as Promise<any>;
  }

  public async getCountWhitelist(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getAllTransfers().then(logs => {
        const accounts = {};
        for (let i = 0; i < logs.length; i++) {
          const log = logs[i];
          accounts[log.args.from] = 1;
          accounts[log.args.to] = 1;
        }
        const arrayAccounts = Object.keys(accounts);
        let count = 0;
        let loops = 0;
        for (let i = 0; i < arrayAccounts.length; i++) {
          this._tokenContract.whitelist(arrayAccounts[i], (err, result) => {
            if (result) {
              ++count;
            }
            ++loops;

            console.log(arrayAccounts[i] + ' result:' + (result ? 'Whitelist' : '---------') + ' count:' + count + ' loops:' + loops);
            if (loops >= arrayAccounts.length) {
              resolve(count);
            }
          });
        }
      });
    }) as Promise<number>;
  }

  public async balanceOf(_addr: string): Promise<number> {
    const account = _addr;
    return new Promise((resolve, reject) => {
      this._tokenContract.balanceOf.call(account, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async lockedtokensOf(_addr: string): Promise<number> {
    const account = _addr;
    return new Promise((resolve, reject) => {
      this._tokenContract.lockedtokensOf.call(account, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async notesOf(_addr: string): Promise<number> {
    const account = _addr;
    return new Promise((resolve, reject) => {
      this._tokenContract.notesOf.call(account, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async depositsOf(_addr: string): Promise<number> {
    const account = _addr;
    return new Promise((resolve, reject) => {
      this._tokenContract.depositsOf.call(account, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async whitelist(_addr: string): Promise<boolean> {
    const account = _addr;
    return new Promise((resolve, reject) => {
      this._tokenContract.whitelist.call(account, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<boolean>;
  }

  public async showAccount(): Promise<string> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      resolve(account);
    }) as Promise<string>;
  }

  public async getRoles(roles: string[]): Promise<string[]> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      const listRoles: any = [];
      let loops = 0;
      for (let i = 0; i < roles.length; i++) {
        this._tokenContract.hasRole(account, roles[i], (err, result) => {
          if (err != null) {
            reject(err);
          }
          if (result) {
            listRoles.push(roles[i]);
          }
          ++loops;
          if (loops >= roles.length) {
            resolve(listRoles);
          }
        });
      }
    }) as Promise<string[]>;
  }

  public async transfer(_to: string, _value: number): Promise<string> {
    const to = _to;
    const value = _value;
    return new Promise((resolve, reject) => {
      this._tokenContract.transfer(to, value, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async transferFrom(_from: string, _to: string, _value: number): Promise<string> {
    const from = _from;
    const to = _to;
    const value = _value;
    return new Promise((resolve, reject) => {
      this._tokenContract.transferFrom(from, to, value, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async allowance(_owner: string, _spender: string): Promise<number> {
    const owner = _owner;
    const spender = _spender;
    return new Promise((resolve, reject) => {
      this._tokenContract.allowance(owner, spender, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<number>;
  }

  public async approve(_spender: string, _value: number): Promise<string> {
    const spender = _spender;
    const value = _value;
    return new Promise((resolve, reject) => {
      this._tokenContract.approve(spender, value, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async increaseApproval(_spender: string, _value: number): Promise<string> {
    const spender = _spender;
    const value = _value;
    return new Promise((resolve, reject) => {
      this._tokenContract.increaseApproval(spender, value, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async decreaseApproval(_spender: string, _value: number): Promise<string> {
    const spender = _spender;
    const value = _value;
    return new Promise((resolve, reject) => {
      this._tokenContract.decreaseApproval(spender, value, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async addAddressToWhitelist(_addr: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.addAddressToWhitelist(_addr, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async removeAddressFromWhitelist(_addr: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.removeAddressFromWhitelist(_addr, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async lockTokens(_holder: string, _value: number, _txt: string): Promise<string> {
    const holder = _holder;
    const value = _value;
    const txt = _txt;
    return new Promise((resolve, reject) => {
      this._tokenContract.lockTokens(holder, value, txt, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async unLockTokens(_holder: string, _value: number, _txt: string): Promise<string> {
    const holder = _holder;
    const value = _value;
    const txt = _txt;
    return new Promise((resolve, reject) => {
      this._tokenContract.unLockTokens(holder, value, txt, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async moveTokens(_holder: string, _newholder: string, _value: number, _txt: string): Promise<string> {
    const holder = _holder;
    const newholder = _newholder;
    const value = _value;
    const txt = _txt;
    return new Promise((resolve, reject) => {
      this._tokenContract.moveTokens(holder, newholder, value, txt, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async burnTokens(_holder: string, _value: number, _txt: string): Promise<string> {
    const holder = _holder;
    const value = _value;
    const txt = _txt;
    return new Promise((resolve, reject) => {
      this._tokenContract.burnTokens(holder, value, txt, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async offerToSell(_valueLot: number, _price: number): Promise<string> {
    const valueLot = _valueLot;
    const price = _price;
    return new Promise((resolve, reject) => {
      this._tokenContract.offerToSell(valueLot, price, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async cancelOfferSell(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.cancelOfferSell((err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async offerToBuy(_valueLot: number, _price: number): Promise<string> {
    const valueLot = _valueLot;
    const price = _price;
    return new Promise((resolve, reject) => {
      this._tokenContract.offerToBuy(valueLot, { value: price }, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async cancelOfferBuy(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.cancelOfferBuy((err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async dealOfferToSell(_payee: string, _valueLot: number, _valueWei: number): Promise<string> {
    const payee = _payee;
    const valueLot = _valueLot;
    const valueWei = _valueWei;
    return new Promise((resolve, reject) => {
      this._tokenContract.dealOfferToSell(payee, valueLot, { value: valueWei }, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async dealOfferToBuy(_payee: string, _valueLot: number): Promise<string> {
    const payee = _payee;
    const valueLot = _valueLot;
    return new Promise((resolve, reject) => {
      this._tokenContract.dealOfferToBuy(payee, valueLot, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });

    }) as Promise<string>;
  }

  public async getBalance(_addr: string = this._tokenContractAddress): Promise<number> {
    return new Promise((resolve, reject) => {
      // web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));
      // console.log(this._tokenContractAddress);
      this._web3.eth.getBalance(_addr, (err, result) => {
        resolve(this._web3.fromWei(result));
      });
    }) as Promise<number>;
  }

  /* Раздел учредителей */
  public async transferOwnership(_newOwner: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.transferOwnership(_newOwner, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async isSuperuser(_addr: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._tokenContract.isSuperuser(_addr, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<boolean>;
  }

  public async hasRole(_addr: string, _roleName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._tokenContract.hasRole(_addr, _roleName, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<boolean>;
  }

  public async adminAddRole(_addr: string, _roleName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.adminAddRole(_addr, _roleName, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async adminRemoveRole(_addr: string, _roleName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // console.log(_addr);
      this._tokenContract.adminRemoveRole(_addr, _roleName, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async getEther(_valueWei: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getEther(_valueWei, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  public async correctOffers(_addr: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.correctOffers(_addr, (err, result) => {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }

  /* Получение информации о адресе на определенный блок */
  public async getBalanceOfBlock(_addr: string, _block: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.balanceOf(_addr, {}, _block, (err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async getWhitelistBlock(_addr: string, _block: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._tokenContract.whitelist(_addr, {}, _block, (err, result) => {
        if (err !== null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<boolean>;
  }

  /* Управление выборкой 6040 */
  public async getWhiteList(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this._tokenContract.WhitelistedAddressAdded(
        { address: this._tokenContractAddress },
        { fromBlock: 0, toBlock: 'latest' })
        .get((err, logsWhite) => {
          const accounts = [];
          for (let i = 0; i < logsWhite.length; i++) {
            const log = logsWhite[i];
            accounts.push(log.args.addr);
          }
          resolve(accounts);
        });
    }) as Promise<string[]>;
  }

  public async getBlackList(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this._tokenContract.WhitelistedAddressRemoved(
        { address: this._tokenContractAddress },
        { fromBlock: 0, toBlock: 'latest' })
        .get((err, logsBlack) => {
          const accounts = [];
          for (let i = 0; i < logsBlack.length; i++) {
            const log = logsBlack[i];
            accounts.push(log.args.addr);
          }
          resolve(accounts);
        });
    }) as Promise<string[]>;
  }

  public async selectionISF() {
    const allWhiteList = await this.getWhiteList();
    const whiteListSet = new Set([...allWhiteList]);
    const whiteListArray = Array.from(whiteListSet);

    const checkedAccounts = new Array();

    for (const account of whiteListArray) {
      if (await this.whitelist(account)) {
        const balanceWLAccount = await this.balanceOf(account);
        // прибавить к балансу кол-во заблокированных токенов
        const lockedtokenWLAccount = await this.lockedtokensOf(account);
        checkedAccounts.push([account, Number(balanceWLAccount) + Number(lockedtokenWLAccount)]);
      }
      if (whiteListArray[whiteListArray.length - 1] === account) {
        console.log(typeof(checkedAccounts));
        checkedAccounts.sort(function(a, b) {
          if (a[1] === b[1]) {
            return 0;
          } else {
            return (a[1] > b[1]) ? -1 : 1;
          }
        });
      }
    }
    return new Promise((resolve, reject) => {
      resolve(checkedAccounts);
    });
  }
}
