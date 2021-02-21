import {Injectable} from '@angular/core';
import {Account} from './account.model';
import {AccountService} from '../sign-in/account.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  constructor(private accountService: AccountService) {

  }

  async getBankAccounts(): Promise<any> {
    return await this.accountService.db.accounts.where({
      user_id: this.accountService.userValue.id
    }).toArray();
  }

  async createAccount(name, balance, currency): Promise<any> {
    await this.accountService.db.accounts.add({
      user_id: this.accountService.User.value.id,
      name: name,
      balance: balance,
      currency: currency,
      accountNumber: Math.floor(Math.random() * 90000) + 10000
    });
  }
}
