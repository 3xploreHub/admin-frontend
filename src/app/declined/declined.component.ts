import { DeclinedDetailsComponent } from './../declined-details/declined-details.component';
import { AdminService } from './../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
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
  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
      private adminService: AdminService,
      public route: ActivatedRoute, ) {
      this.adminService.getAllBookings('Rejected').subscribe((data) => {
      this.bookingAccount = data;
      this.dataSource = new MatTableDataSource<any>(this.bookingAccount);
      console.log('Account', this.bookingAccount);
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
