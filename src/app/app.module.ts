import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailCardComponent } from './account-detail-card/account-detail-card.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { ListTransferComponent } from './list-transfer/list-transfer.component';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AccountsComponent,
    AccountDetailCardComponent,
    AddAccountComponent,
    AccountDetailComponent,
    MakeTransferComponent,
    ListTransferComponent,
    MyCurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
