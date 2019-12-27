import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public addManager(user) {
    return this.http.post(`${environment.apiUrl}/user`, user);
  }
  public getAllManagers() {
    return this.http.get(`${environment.apiUrl}/user/getAllManagers`);
  }
  public deleteManager(id:number){
    return this.http.delete(`${environment.apiUrl}/user/`+id, {responseType:'text'});
  }
  public verifyIfUserNameExists(userN:String){
    let user = {
      userName : userN,
      password : '',
      role: 'manager'
    };
    return this.http.post(`${environment.apiUrl}/user/userName`,user);
  }

  // createManager(manager) {
  //   const user = {
  //     userName: manager.userName,
  //     password: manager.password,
  //     role: "manager"
  //   };
  //   return this.http.post(`${environment.apiUrl}/user`, user);
  // }
}
