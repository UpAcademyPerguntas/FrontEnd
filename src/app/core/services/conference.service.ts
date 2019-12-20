import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  conferences = [];

  constructor(private http: HttpClient) {   }

  getAllConferencesByUserId(id){
    return this.http.get(`${environment.apiUrl}/conference/user/`+id);
  }

  getConferenceById(id){
    return this.http.get(`${environment.apiUrl}/conference/`+id);
  }

  deleteConferenceById(id){
    return this.http.delete(`${environment.apiUrl}/conference/`+id, {responseType: 'text'});
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/conference/getAll`);
  }

  addConference(conference) {
    this.conferences.push(conference);
    return this.http.post(`${environment.apiUrl}/conference/`,conference);
   
    //this.conferences$.next(this.conferences);
  }

  getConference() {
     return this.conferences;
   }

  // clearConference() {
  //   this.conferences = [];
  //   return this.conferences;
  // }
}
