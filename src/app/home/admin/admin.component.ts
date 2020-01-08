import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin.service';
import {MatPaginator} from '@angular/material/paginator';
import { ModalConfirmComponent } from 'src/app/modal-confirm/modal-confirm.component';


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
  displayedColumns: string[] = ['username', 'actions', ];

  applyFilter(filterValue: string) {
    this.fieldArray.filter = filterValue.trim().toLowerCase();

  }
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    public adminService: AdminService){}



  ngOnInit() {
    this.fieldArray.paginator = this.paginator;
    this.changeDetectorRefs.detectChanges();
    this.adminService.getAllManagers().subscribe ((data:any[]) =>{
      console.log(data);
      data.forEach( element => {
        this.addDataToTable(element);
      })
    })
  }

  openDialog(index): void {
    const dialogRef = this.matDialog.open(ModalConfirmComponent, {
      width: '300px',
      data: {message: 'Delete manager?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == 'delete') {
        this.deleteData(index)
      }
    });
  }


  login() {
    console.log(this.currentUser);
    // pedido para a api : this.currentUser
  }
  createManager() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '386px';
    dialogConfig.width = '600px';
      // tslint:disable-next-line: align
      this.matDialog.open(ModalComponent, dialogConfig)
        .beforeClose().subscribe((data: any) => {
          console.log(data);
          if(data!=undefined){

            let user={
              userName:data.userName,
              password:data.password,
              role:"manager"
            };
            this.adminService.addManager(user).subscribe( response => {
            this.addDataToTable(user);
          },err => {
            console.log('deu erro');

          })
        }
        });
  }
  addDataToTable(data) {
    const array = [...this.fieldArray.data, data];
    array.sort((a,b)=>{
      if (a.userName<b.userName){
        return -1;
      }
      else if (a.userName>b.userName){
        return 1;
      }
      else{
        return 0;
      }
    });

    this.fieldArray.data = array;
    // this.changeDetectorRefs.detectChanges();
    console.log(this.fieldArray);

  }
  deleteData(index) {
    console.log(index);
    console.log(this.fieldArray.data[index]);

    this.adminService.deleteManager(this.fieldArray.data[index].id).subscribe(data => {
      this.fieldArray.data.splice(index, 1);
      this.fieldArray._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }
}

