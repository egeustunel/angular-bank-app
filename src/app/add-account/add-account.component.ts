import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BankAccountsService} from '../accounts/bank-accounts.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isUserExists: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: BankAccountsService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      accountName: ['', Validators.required],
      balance: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    this.accountService.createAccount(this.form.value.accountName, this.form.value.balance, this.form.value.currency).then(() => {
      this.router.navigateByUrl('/accounts');
    });
  }

}
