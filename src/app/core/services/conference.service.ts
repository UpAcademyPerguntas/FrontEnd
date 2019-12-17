import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  conferences = [];

  conferences$ = new ReplaySubject(); //observavel

  constructor() { }

  addConference(conferenceForm) {
    this.conferences.push(conferenceForm);
    this.conferences$.next(this.conferences);
  }

  getConference() {
    return this.conferences;
  }

  clearConference() {
    this.conferences = [];
    return this.conferences;
  }
}
