import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ConferenceService } from 'src/app/core/services/conference.service';


@Component({
  selector: 'app-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.scss']
})
export class CreateConferenceComponent implements OnInit {
  
  conferenceForm = this.conference.group({
    name: ['', Validators.required],
    discription: [''],
    date: [''],
    time: [''],
  });
  
  constructor(
    private conference: FormBuilder,
    private conferenceService: ConferenceService
    ) { }
  
  
  onSubmit() {
                
                // TODO: Use EventEmitter with form value
    window.alert('Your conference has been added to My Conference page!');
    console.warn(this.conferenceForm.value); //= a console log
    this.conferenceService.addConference(this.conferenceForm.value) //observavel
    
    //console.log(conferences);
    
  }
  
  deleteConference() {
    

    this.conferenceService.clearConference();

    console.log(this.conferenceForm.value);

    console.log("entrou na updateConference()");
    
  }
  
    
    conferences: any;
    ngOnInit() {
      this.conferences = this.conferenceService.getConference();
    }

  }
