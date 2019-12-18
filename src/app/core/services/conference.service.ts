import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { HttpClientModule, HttpClient }    from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  conferences = [];

  // //conferences$ = new ReplaySubject(); //observavel

  constructor(private http: HttpClient) {   }

  getAllConferences(id){
    return this.http.get('http://localhost8080/QuestionsAPI/api/conference/user/'+id);
  }

  addConference(conferenceForm) {
    this.conferences.push(conferenceForm);
    //this.conferences$.next(this.conferences);
  }

  // getConference() {
  //   return this.conferences;
  // }

  // clearConference() {
  //   this.conferences = [];
  //   return this.conferences;
  // }
}
