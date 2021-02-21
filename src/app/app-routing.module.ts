import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthGuard} from './sign-in/auth.guard';
import {AccountsComponent} from './accounts/accounts.component';
import {AddAccountComponent} from './add-account/add-account.component';
import {ListTransferComponent} from './list-transfer/list-transfer.component';
import {MakeTransferComponent} from './make-transfer/make-transfer.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: AccountsComponent, canActivate: [AuthGuard]},
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  { path: 'accounts/add-account', component: AddAccountComponent, canActivate: [AuthGuard]},
  { path: 'transactions', component: ListTransferComponent, canActivate: [AuthGuard]},
  { path: 'transactions/make-transaction', component: MakeTransferComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
