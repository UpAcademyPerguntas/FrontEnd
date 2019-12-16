import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  conferencesArray = [];

  conferencesArray$ = new ReplaySubject(); //observavel

  constructor() { }

  addConference(conferenceForm) {
    this.conferencesArray.push(conferenceForm);
    this.conferencesArray$.next(this.conferencesArray);
  }

  getConference() {
    return this.conferencesArray;
  }

  clearConference() {
    this.conferencesArray = [];
    return this.conferencesArray;
  }
}
