import { EventEmitter, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DetailsComponent } from './../details/details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PusherService } from '../pusher.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})


export class NewNotificationComponent implements OnInit {
  bookingAccount: any;
  @Input() passData: { bookingAccount };//data to pass pra nis filter wa ni gana huhuhuh
  @Output() searchBooking = new EventEmitter<String>();
  @ViewChild(MatPaginator) paginator: MatPaginator

  

  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, private pusherService: PusherService,
    private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Pending').subscribe((data) => {
      this.bookingAccount = data;
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
      console.log("maw: ", this.dataSource);
     

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0)
       this.dataSource.filterPredicate = function (data:any, filter: string): boolean {
        console.log("esprokitik: ",data); 
        return data.toLowerCase().includes(filter)
      }
     
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
      disableClose: false,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
