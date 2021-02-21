import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthGuard} from './sign-in/auth.guard';
const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '', canActivate: [AuthGuard]  }
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
