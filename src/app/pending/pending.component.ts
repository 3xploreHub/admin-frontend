// import { PusherService } from './../../../../exploreHub-frontend/src/app/services-common-helper/PushNotification/pusher.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { PendingDetailsComponent } from './../pending-details/pending-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
    private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Processing').subscribe((data) => {
      this.bookingAccount = data;
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
      console.log('Account', this.bookingAccount);
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
