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
  conferenceIndexToEdit: number;
  sortOption: string;
  conferenceIdShare: number;
  public myAngularxQrCode: string = null;


  //criar uma variavel que é da class ConferenceService
  constructor(
    private conferenceService: ConferenceService,
    private conferenceBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  showWarningNoConference() {

    if (this.managerConferences.length == 0) {
      return true;
    }
    else { return false; }
  }

  openModal(template: TemplateRef<any>, conferenceId: number) {

    this.conferenceForm = this.conferenceBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      videoUrl: ['https://www.youtube.com/watch?v=wCfTVQBeiPE', Validators.required],// /embed/wCfTVQBeiPE
      Id: [this.managerId],
    });

    this.modalRef = this.modalService.show(template);

    this.conferenceIdShare = conferenceId;
  }

  openModalEdit(template: TemplateRef<any>, conferenceId: number) {
    this.modalRef = this.modalService.show(template);

   

    for (let i = 0; i < this.managerConferences.length; i++) {
      if (this.managerConferences[i].id == conferenceId) {

        this.conferenceIndexToEdit = i;

        const objToEdit = JSON.parse(JSON.stringify(this.managerConferences[this.conferenceIndexToEdit]));
  
        let arrDate = objToEdit.date.split('-');

        objToEdit.date = new Date(parseInt(arrDate[0]), parseInt(arrDate[1]) - 1, parseInt(arrDate[2]));

        this.conferenceForm.patchValue(objToEdit); //

      }
    }
  }

  

  onSubmit() {
    
    console.log(this.conferenceForm);
    //this.managerConferences.push(this.conferenceForm.value);   
    console.log(this.conferenceForm.value.date);

    let d: Date = this.conferenceForm.value.date;
    //let time = this.conferenceForm.value.time;

    const conference = {
      name: this.conferenceForm.value.name,
      description: this.conferenceForm.value.description,
      location: this.conferenceForm.value.location,
      videoUrl: this.conferenceForm.value.videoUrl,
      managersList: [{ id: this.managerId }],
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: this.conferenceForm.value.time.substr(0, 2),
      min: this.conferenceForm.value.time.substr(3, 2)
    };

    console.log(conference);

    this.conferenceService.addConference(conference).subscribe(data => // antes estavamos a fazer push do conferenceForm
      this.managerConferences.push(data));

    this.conferenceForm.reset();
  }



  onEditSubmit(conferenceIndexToEdit, conferenceId) {

    console.log(conferenceIndexToEdit);

    console.log(conferenceId);


    console.log(this.conferenceForm.value);

    let d: Date = this.conferenceForm.value.date;

    const conference = {
      id: conferenceId,
      name: this.conferenceForm.value.name,
      description: this.conferenceForm.value.description,
      location: this.conferenceForm.value.location,
      videoUrl: this.conferenceForm.value.videoUrl,
      managersList: [{ id: this.managerId }],
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: this.conferenceForm.value.time.substr(0, 2),
      min: this.conferenceForm.value.time.substr(3, 2)
    };

    console.log(conference);

    this.conferenceService.updateConferenceById(conference, conferenceId, conferenceIndexToEdit).subscribe(data => // antes estavamos a fazer push do conferenceForm
      this.managerConferences.push(data)
      );

    this.conferenceForm.reset();

    this.managerConferences.splice(conferenceIndexToEdit, 1);

  }


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
    this.myAngularxQrCode = 'http://192.168.150.213:4200/conference/1/questions';
    
    console.log(localStorage.getItem('currentUser'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.managerId = currentUser.id;

    this.conferenceService.getAllConferencesByUserId(this.managerId).subscribe((data: any[]) => { //any[] está à espera de receber um array
    
      this.managerConferences = data;

    });

    this.conferenceForm = this.conferenceBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      videoUrl: ['https://www.youtube.com/watch?v=wCfTVQBeiPE', Validators.required],
      Id: [this.managerId],
    });


  }

  sort() {

    if (this.sortOption == 'name') {

      this.managerConferences.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        else if (a.name > b.name) {
          return 1;
        }
        else {
          return 0;
        }
      });
    }
    else if (this.sortOption == 'dateAsc') {
      this.managerConferences.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        else if (a.date > b.date) {
          return 1;
        }
        else {
          return 0;
        }
      });
    }
    else if (this.sortOption == 'dateDesc') {
      this.managerConferences.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        else if (a.date > b.date) {
          return 1;
        }
        else {
          return 0;
        }
      });
      this.managerConferences.reverse();
    }
  }

}
