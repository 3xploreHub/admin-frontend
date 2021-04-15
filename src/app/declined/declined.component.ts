import { DeclinedDetailsComponent } from './../declined-details/declined-details.component';
import { AdminService } from './../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// CommonJS
// const Swal = require('sweetalert2')


@Component({
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.css']
})
export class DeclinedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator : MatPaginator
  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
      private adminService: AdminService,
      public route: ActivatedRoute, ) {
      this.adminService.getAllBookings('Rejected').subscribe((data) => {
      this.bookingAccount = data;
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
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
    this.dialog.open(DeclinedDetailsComponent, {
      disableClose : false,
      id : 'modal-component',
      data : id,
      panelClass : 'custom-modalbox'
    });
  }

}
