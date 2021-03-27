import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from './../details/details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PusherService } from '../pusher.service';
import { MatTableDataSource } from '@angular/material/table'



// export interface BookingAccount {
//   id: number;
//   fullName: string;
//   location: string;
//   dateProcess: string;
// }


// const ELEMENT_DATA: PeriodicElement[] = [
//   { id: 1, fullName: 'Jhonny Bravo', location: "Moalboal, Cebu", dateProcess: "10/2/21" },

// ];

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
    this.adminService.getAllBookings("Pending").subscribe((data) => {
      this.bookingAccount = data
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount)
    }
    )
  }
  ngOnInit(): void {
    //pusher
    // this.pusherService.messagesChannel.bind('my-event', (message) => {
    //   ELEMENT_DATA.push(message)
    //   this.dataSource.data = ELEMENT_DATA;
    //   console.log(message)
    // });
   
  }
  openModal(id: any) {
    let status = id.status
    
    console.log("status: ", status);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "650px";
    dialogConfig.width = "600px";
    dialogConfig.backdropClass = "backdropBackground";
    dialogConfig.data = id;
    // dialogConfig.data = status
    const modalDialog = this.dialog.open(DetailsComponent, dialogConfig);
  }

}