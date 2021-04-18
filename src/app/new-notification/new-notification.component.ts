import { EventEmitter, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DetailsComponent } from './../details/details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
// export interface PeriodicElement {
//   id :Number;
//   fullName: string;
//   localtion:string;
//   dateProcess:Date
// }
@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})


export class NewNotificationComponent implements OnInit {
  bookingAccount: any[];
  @Input() passData: { bookingAccount };//data to pass pra nis filter wa ni gana huhuhuh
  @Output() searchBooking = new EventEmitter<String>();
  @ViewChild(MatPaginator) paginator: MatPaginator



  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, 
    private adminService: AdminService, public route: ActivatedRoute, ) {
    this.getBookings()
  }

  ngOnInit(): void {
    this.adminService.notification.subscribe(
      (data:any) => {
        if (data.booking && data.booking.status == "Pending" || data.booking && data.booking.status == "Cancelled") {
          this.getBookings()
        }
      }
    )
  }

  getBookings() {
    this.adminService.getAllBookings('Pending').subscribe((data: any[]) => {
      this.bookingAccount = data;
      this.bookingAccount = this.bookingAccount.filter(booking => !booking.isManual)
      this.populateTable()
    })
  }

  openModal(id: any) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      disableClose: false,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingAccount = this.bookingAccount.filter(booking => booking._id != result)
        this.populateTable()
      }
    });
  }

  populateTable() {
    this.dataSource = new MatTableDataSource<any>(this.bookingAccount);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0)
      
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.tourist.fullName.toLocaleLowerCase().includes(filter)
      }
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
