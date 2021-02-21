import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Dexie from 'dexie';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BankAccountsService} from '../accounts/bank-accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  db: any;
  User = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,
              private router: Router) {
    this.db = new Dexie('MyDatabase');
    // Declare tables, IDs and indexes
    this.db.version(1).stores({
      users: '++id, name, password',
      accounts: '++id, user_id, name, balance, currency, accountNumber'
    });
  }

  get user(): Observable<any> {
    return this.User.asObservable();
  }

  get userValue(): any {
    return this.User.value;
  }

  get userIsAuthenticated(): Observable<any> {
    return this.User.asObservable().pipe(
      map((user) => {
        if (user) {
          console.log(!!user.name);
          return !!user.name;
        } else {
          return false;
        }
      })
    );
  }

  async checkUsername(username: string): Promise<any> {
    const user = await this.db.users.get({
      name: username
    });
    return user;
  }

  async register(username: string, pass: string): Promise<any> {
    await this.db.users.add({
      name: username,
      password: pass
    });
  }

  async login(username, password): Promise<any> {
    const user = await this.db.users.get({
      name: username,
      password: password
    });
    if (user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
      this.User.next(user);
    }

    return user;
  }

  async autoLogin(): Promise<any> {
    const user = localStorage.getItem('user');
    if (user) {
      this.User.next(JSON.parse(user));
    }
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.User.next(null);
    this.router.navigate(['sign-in']);
  }
}
