import { Component, OnInit } from '@angular/core';
import { ConferenceService } from 'src/app/core/services/conference.service';


@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  arrayList = [];


  constructor(private conferenceService: ConferenceService) { //criar uma variavel que é da class ConferenceService

  }

  ngOnInit() {
    this.conferenceService.conferences$.subscribe((data:any[]) => {
      
      this.arrayList = data;
      
      console.log(data);

      console.log(this.arrayList);

    })


  }

}
