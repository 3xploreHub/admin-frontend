
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from './../details/details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PusherService } from '../pusher.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})


export class NewNotificationComponent implements OnInit {

  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, private pusherService: PusherService,
              private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Pending').subscribe((data) => {
      this.bookingAccount = data;
      console.log(this.bookingAccount);
      
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);

    }
    );
  }
  ngOnInit(): void {
  }
  openModal(id: any) {
    const status = id.status;

    console.log('status: ', status);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '650px';
    dialogConfig.width = '600px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.data = id;
    // dialogConfig.data = status
    const modalDialog = this.dialog.open(DetailsComponent, dialogConfig);
  }

}
