import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ConferenceService } from 'src/app/core/services/conference.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})

export class ConferencesComponent implements OnInit {
  managerId: number;
  conferenceForm: FormGroup;
  managerConferences: any[] = [];
  modalRef: BsModalRef;
  conferenceToEdit: number;

  //criar uma variavel que é da class ConferenceService
  constructor(
    private conferenceService: ConferenceService,
    private conferenceBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  openModalSubmit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, conferenceId: number) {
    this.modalRef = this.modalService.show(template);

    console.log(conferenceId);
    console.log(this.managerConferences);

    for (let i = 0; i < this.managerConferences.length; i++) {
      if (this.managerConferences[i].id == conferenceId){

        console.log(this.managerConferences[i]);
        
        this.conferenceToEdit = i;
  
        console.log(i);
      }
      
    }


  }

  onSubmit() {
    //this.managerConferences.push(this.conferenceForm.value);    
    let d: Date = this.conferenceForm.value.date;
    //let time = this.conferenceForm.value.time;

    const conference = {
      name: this.conferenceForm.value.name,
      description: this.conferenceForm.value.description,
      managersList: [{ id: this.managerId }],
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDay(),
      hour: this.conferenceForm.value.time.substr(0, 2),
      min: this.conferenceForm.value.time.substr(3, 2)
    };

    console.log(conference);

    this.conferenceService.addConference(conference).subscribe(data => // antes estavamos a fazer push do conferenceForm
      this.managerConferences.push(data));

    this.conferenceForm.reset();
  }

  shareLink(conferenceId: number) {
    window.alert('http://localhost:4200/conference/'+ conferenceId + '/questions');
  }


  /*onEditSubmit(conferenceId) {

    this.conferenceService.getConferenceById(conferenceId).subscribe((data: any[]) => {
      console.log(data);
      this.managerConferences = data;
      console.log(this.managerConferences);

    });

  }*/


  deleteConference(conferenceId: number) {

    this.conferenceService.deleteConferenceById(conferenceId).subscribe((data: any) => {
      console.log(data);
    });

    for (let i = 0; i < this.managerConferences.length; i++) {
      if (this.managerConferences[i].id == conferenceId) {
        console.log(this.managerConferences[i]);
        this.managerConferences.splice(i, 1);
      }
    }

  }

  ngOnInit() {
    // this.managerId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(localStorage.getItem('currentUser'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.managerId = currentUser.id;

    this.conferenceService.getAllConferencesByUserId(this.managerId).subscribe((data: any[]) => { //any[] está à espera de receber um array
      console.log(data);
      this.managerConferences = data;

      console.log(this.managerConferences);


    });
    this.conferenceForm = this.conferenceBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      Id: [this.managerId],
    });


  }


}
