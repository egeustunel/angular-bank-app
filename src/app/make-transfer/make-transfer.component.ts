import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BankAccountsService} from '../accounts/bank-accounts.service';
import {CurrencyConverterService} from './currency-converter.service';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.css']
})
export class MakeTransferComponent implements OnInit {
  type: string;
  form: FormGroup;
  loading = false;
  submitted = false;
  isUserExists: boolean;
  accounts: any;
  source: any;
  target: any;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private bankAccountService: BankAccountsService,
              private currencyConverterService: CurrencyConverterService,
              private router: Router) {
  }

  async ngOnInit(): Promise<any> {
    this.form = this.formBuilder.group({
      source: ['', Validators.required],
      target: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.accounts = await this.bankAccountService.getBankAccounts();
    console.log(this.accounts);
    this.route.queryParams
      .subscribe(params => {
          this.type = params.type;
        }
      );

  }

  get f() {
    return this.form.controls;
  }

  async onSubmit(): Promise<any> {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    const data = await this.currencyConverterService.checkIfHasBalance(this.form.value.source.id);
    console.log(data);
    if (data.balance > this.form.value.amount) {
      const newSourceAmount = this.form.value.source.balance - this.form.value.amount;
      const amountInTL = this.form.value.amount * this.currencyConverterService.currencies[this.form.value.source.currency];
      const amountInTarget = amountInTL / this.currencyConverterService.currencies[this.form.value.target.currency];
      const newTargetAmount = this.form.value.target.balance + amountInTarget;
      await this.currencyConverterService
        .makeTransaction(this.form.value.source.id,
        this.form.value.target.id,
          newSourceAmount,
          newTargetAmount);
      await this.currencyConverterService
        .saveTransaction(this.form.value.source.id,
          this.form.value.target.id,
          this.form.value.source.accountNumber,
          this.form.value.target.accountNumber,
          this.form.value.amount,
          this.form.value.description);
      this.router.navigateByUrl('transactions');
    }
  }

}
