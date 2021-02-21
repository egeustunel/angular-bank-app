import {Injectable} from '@angular/core';
import {AccountService} from '../sign-in/account.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  currencies: {[key: string]: number} = {
    dolar: 7,
    euro: 8.5,
    gold: 400,
    tl: 1
  };

  constructor(private accountService: AccountService) {
  }

  checkIfHasBalance(source): any {
    return this.accountService.db.accounts.get({
      id: source
    });
  }

  saveTransaction(senderId, receiverId, senderAccountNumber, receiverAccountNumber, amount, description, type): any {
    return this.accountService.db.transactions.add({
      sender_id: senderId,
      receiver_id: receiverId,
      sender_accountNumber: senderAccountNumber,
      receiver_accountNumber: receiverAccountNumber,
      amount: amount,
      description: description,
      type: type,
      user_id: this.accountService.userValue.id
    });
  }
  makeTransaction(senderId, receiverID, senderNewBalance, receiverNewBalance ): any {
    this.accountService.db.accounts.update(senderId, {balance: senderNewBalance});
    this.accountService.db.accounts.update(receiverID, {balance: receiverNewBalance});
  }
}
