import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {

  constructor(private conferenceService: ConferenceService) { //criar uma variavel que é da class ConferenceService

  }

  ngOnInit() {
    this.conferenceService.conferencesArray$.subscribe(data => {
      console.log(data);

    })


  }

}
