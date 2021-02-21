import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BankAccountsService} from '../accounts/bank-accounts.service';

@Component({
  selector: 'app-list-transfer',
  templateUrl: './list-transfer.component.html',
  styleUrls: ['./list-transfer.component.css']
})
export class ListTransferComponent implements OnInit {
  transactions: any;
  constructor(private router: Router,
              private accountService: BankAccountsService) { }

  async ngOnInit(): Promise<any> {
    this.transactions = await this.accountService.getTransactions();
    console.log(this.transactions);
  }

  makeTransaction(type): any {
    this.router.navigate(['transactions/make-transaction'], { queryParams: { type: type } });
  }

}
