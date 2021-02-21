import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AccountService} from './sign-in/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cubicl';
  username: string;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((data) => {
      if (data) {
        this.username = data.name;
      }
    });
  }

  logout(): void {
    this.username = null;
    this.accountService.logout();
  }
}
