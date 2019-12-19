import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ConferenceService } from 'src/app/core/services/conference.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {

  conferenceForm = this.conferenceBuilder.group({
    name: ['', Validators.required],
    description: [''],
    date: [''],
    time: [''],
  });

  managerConferences:any[] = [];
  modalRef: BsModalRef;
  conferenceCount: number;
  managerId: number;
  
  //criar uma variavel que é da class ConferenceService
  constructor(
    private conferenceService: ConferenceService,
    private conferenceBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    ) { 

  }
  
  onSubmit() {         
    //window.alert('Your conference has been added to My Conference page!');
    console.warn(this.conferenceForm.value); //= a console log
    this.managerConferences.push(this.conferenceForm.value);

    this.conferenceService.addConference(this.conferenceForm.value) //observavel
    this.conferenceForm.reset();
  }

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

deleteConference(x){
  
    console.log("quero apagar esta conferenceia");
    console.log(this.managerConferences);
    
    this.managerConferences.splice(x, 1);
    console.log(this.managerConferences);
    
  }
  
  ngOnInit() {
    //this.managerId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(localStorage.getItem("currentUser"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.managerId = currentUser.id;
    console.log("sabes");
    this.conferenceService.getAllConferences(this.managerId).subscribe( (data:any[]) => {
      console.log(data);
      this.managerConferences = data;
    });

  }
  
}