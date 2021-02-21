import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user;
    this.accountService.userIsAuthenticated.subscribe(data => {
      if (!data) {
        this.accountService.autoLogin().then(() => {
          if (this.accountService.userIsAuthenticated) {
            user = true;
          } else {
            user = false;
          }
        });
      } else {
        user = true;
      }
    });
    if (!user) {
      this.router.navigateByUrl('/sign-in');
    }
    return user;
  }
}
