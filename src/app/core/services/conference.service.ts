import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  conferences = [];

  constructor(private http: HttpClient) {   }

  getAllConferences(id){
    return this.http.get(`${environment.apiUrl}/conference/user/`+id);
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/conference/getAll`);
  }

  addConference(conferenceForm) {
    this.conferences.push(conferenceForm);
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
