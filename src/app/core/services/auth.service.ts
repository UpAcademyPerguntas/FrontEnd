import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public currentRole = '';

  public currUserTemp: any = {};
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // o localstorage permite guardar o login mesmo que se faça refresh da pagina e que a pessoa saia da pagina
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // se quiser retirar alguma info do login
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  login(userName, password) {
    console.log(userName, password);

    return this.http.post(`${environment.apiUrl}/user/auth`, {'userName': userName, 'password': password, 'role': null })
      .pipe(map((user:any) => {
        //store user details in local storage to keep the user logged in
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentUserRole', JSON.stringify(user.role));
        this.currentUserSubject.next(user);
        return user;
      }));


  }



  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
