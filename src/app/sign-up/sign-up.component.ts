import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AccountService} from '../sign-in/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isUsernameAvailable = true;
  isUserCreated = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  onSubmit(): any {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // check if username is already taken

    this.accountService.checkUsername(this.form.value.username).then(data => {
      if (data === undefined) {
        this.loading = true;
        this.accountService.register(this.form.value.username, this.form.value.password).then(() => {
          this.isUserCreated = true;
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        });
      } else {
        this.isUsernameAvailable = false;
      }
    });


    /*.then()
    .subscribe({
      next: () => {
        this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });*/
  }
}
