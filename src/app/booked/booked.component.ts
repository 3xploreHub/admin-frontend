import { AdminService } from './../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { BookedDetailsComponent } from '../booked-details/booked-details.component';


@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {
  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
              private adminService: AdminService, public route: ActivatedRoute, ) {
    this.adminService.getAllBookings('Booked').subscribe((data) => {
      this.bookingAccount = data;
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
      console.log('Account', this.bookingAccount);
    }
    );
  }
  ngOnInit(): void {
  }
  openModal(id) {
    this.dialog.open(BookedDetailsComponent, {
      disableClose : false,
      id : 'modal-component',
      data : id,
      panelClass : 'custom-modalbox'
    });
  
  }

}
