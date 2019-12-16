import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ConferenceService } from '../services/conference.service';

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
  

  onSubmit() {
    // TODO: Use EventEmitter with form value
  console.warn(this.conferenceForm.value);
  this.conferenceService.addConference(this.conferenceForm.value) //observavel
  }

  updateConference() {
    
    console.log("entrou na updateConference()");
    
  }

  constructor(private conference: FormBuilder,private conferenceService: ConferenceService) { }

  ngOnInit() {
    }

  }
