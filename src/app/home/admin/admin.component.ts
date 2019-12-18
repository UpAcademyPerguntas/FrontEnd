import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  username: string;
  password: string;

}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public currentUser: any = {};
  public fieldArray =  new MatTableDataSource<any>();

  public newAttribute: any = {};
  displayedColumns: string[] = ['name', 'username', 'password', 'actions'];
  dataSource =  [];

  constructor(public matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.changeDetectorRefs.detectChanges();
  }

  login() {
    console.log(this.currentUser);
    // pedido para a api : this.currentUser
  }
  createManager() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      // tslint:disable-next-line: align
      this.matDialog.open(ModalComponent, dialogConfig)
        .beforeClose().subscribe((data: any) => {
          console.log(data);
          this.addDataToTable(data);
        });
  }
  addDataToTable(data) {
    let array = [...this.fieldArray.data, data];
    this.fieldArray.data = array;
    //this.changeDetectorRefs.detectChanges();
    console.log(this.fieldArray);

  }
  deleteData(index){
    console.log(index);

    this.fieldArray.data.splice(index, 1);
    this.fieldArray._updateChangeSubscription(); // <-- Refresh the datasource
  }
}

