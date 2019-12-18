import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConferenceService } from 'src/app/core/services/conference.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  arrayList = [];
  modalRef: BsModalRef;
  conferenceCount: number; ; 
  
  //criar uma variavel que é da class ConferenceService
  constructor(private conferenceService: ConferenceService, private modalService: BsModalService) { 

  }

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  deleteConference(x){

    console.log("quero apagar esta conferenceia");

    console.log(this.arrayList);

    this.arrayList.splice(x, 1);

    console.log(this.arrayList);
    
  }


  ngOnInit() {
    this.conferenceService.conferences$.subscribe((data:any[]) => {
      
      this.arrayList = data;
      
      console.log(data);

      console.log(this.arrayList);

    })



  }

}


