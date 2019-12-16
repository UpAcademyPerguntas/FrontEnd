import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public currUserTemp:any = {};
  // private apiUrl = "https://upacademytinder.herokuapp.com/api/users"; //verificar se funciona sem backend
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


  // login(username, password) {
  //   // return this.http.get(this.apiUrl + '?filter={"where":{"username":"' + username + '"}}'); //verificar se funciona sem backend

  //   //com backend
  //   return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {'username': username, 'password': password })
  //     .pipe(map(user => {
  //       //store user details in local storage to keep the user logged in
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       localStorage.setItem('currentUserRole', JSON.stringify(user.role));
  //       this.currentUserSubject.next(user);
  //       return user;
  //     }));
  //   // if (user== admin) {


  //   // }

  // }

  public login(username, password): ReplaySubject<any> {
    // Simulate Jax-rs Api request
    if (username === 'admin' && password === 'admin') {
      this.currUserTemp.id = 1;
      this.currUserTemp.name = 'Ze Carlos';
      this.currUserTemp.role = 'Manager';
    }
    const response: ReplaySubject<any> = new ReplaySubject(1);
    if ( this.currUserTemp.id) {
      response.next( this.currUserTemp);
    } else {
      response.error({ msg: 'Deu erro' });
    }
    this.currentUserSubject.next(this.currUserTemp);
    return response;
  }

  //falta fazer função para verificar se quem esta a fazer log in é admin ou manager e reemcaminhar para a respectiva pagina



  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // this.router.navigate([]) //meter a pagina para onde tem de ir
  }

}
