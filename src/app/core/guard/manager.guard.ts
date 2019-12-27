import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUserRole =  JSON.parse(localStorage.getItem('currentUserRole'));

    if (currentUserRole == 'admin') {
      this.router.navigate(['/home/admin']);
      return false;
      //para negar acesso
    }
    return true;
  }

}
