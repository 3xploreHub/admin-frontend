import { EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit, Input, Output } from '@angular/core';
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
  searchWord: string
  @Input() passData: { bookingAccount };//data to pass pra nis filter wa ni gana huhuhuh
  @Output() searchBooking = new EventEmitter<String>();

  searchThis(){
    this.searchBooking.emit(this.searchWord)
  }

  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, private pusherService: PusherService,
    private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Pending').subscribe((data) => {
      this.bookingAccount = data;
      console.log("maw: ",this.bookingAccount);
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
      if (this.adminService.bookingId) {
        console.log("booking accounts == ", this.bookingAccount)
        this.bookingAccount.forEach(booking => {
          if (booking._id == this.adminService.bookingId) {
            console.log("here::::", booking)
            this.openModal(booking)
            this.adminService.bookingId = ""
          }
        })
      }
    }
    );
  }
  ngOnInit(): void {
  }
  openModal(id: any) {
    this.dialog.open(DetailsComponent, {
      disableClose : false,
      id : 'modal-component',
      data : id,
      panelClass : 'custom-modalbox'
    });
  }

}
