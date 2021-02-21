import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BankAccountsService} from './bank-accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any;
  constructor(private router: Router,
              private bankAccountService: BankAccountsService) { }

  async ngOnInit(): Promise<any> {
    this.accounts = await this.bankAccountService.getBankAccounts();
  }

  addAccount(): void {
    this.router.navigateByUrl('/accounts/add-account');
  }

}
