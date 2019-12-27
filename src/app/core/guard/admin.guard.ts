import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUserRole =  JSON.parse(localStorage.getItem('currentUserRole'));
    console.log(currentUserRole);

    if (currentUserRole == 'manager') {
      this.router.navigate(['/home/manager/conferences']);
      return false;
      //para negar acesso
    }
    return true;
  }

}
