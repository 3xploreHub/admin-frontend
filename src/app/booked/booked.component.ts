import { ViewChild } from '@angular/core';
import { AdminService } from './../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { BookedDetailsComponent } from '../booked-details/booked-details.component';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator : MatPaginator
  bookingAccount: any[] = [];
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
    private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Booked').subscribe((data: any[]) => {
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
    this.dialog.open(BookedDetailsComponent, {
      disableClose: false,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });

  }

}
