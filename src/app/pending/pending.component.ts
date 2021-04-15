import { ViewChild } from '@angular/core';
// import { PusherService } from './../../../../exploreHub-frontend/src/app/services-common-helper/PushNotification/pusher.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { PendingDetailsComponent } from './../pending-details/pending-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator : MatPaginator
  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
    private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Processing').subscribe((data) => {
      this.bookingAccount = data;
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
      console.log('Account', this.bookingAccount);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        }, 0)
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
  openModal(id) {
    this.dialog.open(PendingDetailsComponent, {
      disableClose : false,
      id : 'modal-component',
      data : id,
      panelClass : 'custom-modalbox'
    });
  }

}
