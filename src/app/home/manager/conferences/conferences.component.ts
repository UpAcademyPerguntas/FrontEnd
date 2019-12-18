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

  conferenceForm = this.conference.group({
    name: ['', Validators.required],
    description: [''],
    date: [''],
    time: [''],
  });

  managerConferences = [];
  modalRef: BsModalRef;
  conferenceCount: number;
  managerId: number;
  
  //criar uma variavel que é da class ConferenceService
  constructor(
    private conferenceService: ConferenceService,
    private conference: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    ) { 

  }
  
  onSubmit() {         
    //window.alert('Your conference has been added to My Conference page!');
    console.warn(this.conferenceForm.value); //= a console log
this.conferenceService.addConference(this.conferenceForm.value) //observavel

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
    this.managerId = 1;
    console.log("sabes");
                            //conferences$ é uma variavel assíncrona
    //this.conferenceService.conferences$.subscribe((data:any[]) => { //vai buscar todas as conferencias
     // this.managerConferences = data;
     // console.log(data);
      //console.log(this.managerConferences);
    //})
    
  console.log(this.conferenceService.getAllConferences(this.managerId));
  
  }
  
}