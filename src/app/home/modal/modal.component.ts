import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminService } from 'src/app/core/services/admin.service';


@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  user = {
    userName: '',
    confirmPassword: '',
    password: ''
  };

  error = false;
  error2 = false;
  error3 = true;
  error4 = false;
  error5 = true;

  constructor(public matDialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {}

  validatePassword() {
    console.log(this.user);

    setTimeout(() => {
      if (this.user.confirmPassword != this.user.password) {
        this.error = true;
      } else {
        this.error = false;
        this.error3 = false;
      }
    }, 500);
  }

  validateUserName(userName:String){
    userName = userName.trim();
    this.error2 = false;
    this.error4 = false;
    setTimeout (() => {
      this.adminService.verifyIfUserNameExists(userName).subscribe(data => {
        if (data == true){
          this.error2 = true;
          this.error5 = true;
        }
      });
      if (userName == ""){
        this.error4 = true;
      }
      else {
        this.error4 = false;
        this.error5 = false;
      }
    }, 500);
  }

  closeModal() {
    this.matDialog.closeAll();
  }
}
