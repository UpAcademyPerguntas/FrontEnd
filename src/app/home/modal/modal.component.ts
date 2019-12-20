import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  user =  {
    userName: '',
    confirmPassword: '',
    password: ''
  };

  error=false;
constructor(public matDialog: MatDialog) { }


ngOnInit() {
  }

  validatePassword(){
    console.log(this.user);

    setTimeout(() => {
      if(this.user.confirmPassword != this.user.password){
        this.error=true;
      }
      else {
        this.error = false;
      }
    }, 500);
  }

  closeModal(){
    this.matDialog.closeAll();
  }
}
