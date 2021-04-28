import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { PendingDetailsComponent } from './../pending-details/pending-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  bookingAccount: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
    private adminService: AdminService, public route: ActivatedRoute,) {
    this.getBookings()


  }
  ngOnInit() {
    this.adminService.notification.subscribe(
      (data: any) => {
        if (data.booking && data.booking.status == "Processing" || data.booking && data.booking.status == "Cancelled") {
          this.getBookings()
        }
      }
    )
  }
  getBookings() {
    this.adminService.getAllBookings('Processing').subscribe((data) => {
      this.bookingAccount = data;
      this.bookingAccount = this.bookingAccount.filter(booking => !booking.isManual)
      this.populateTable()
      this.route.queryParams.subscribe(
        (params: any) => {
          console.log(params)
          if (params && params.bookingId) {
            this.bookingAccount.forEach(booking => {
              console.log(booking._id == params.bookingId)
              if (booking._id == params.bookingId) {
                this.openModal(booking);
              }
            })
          }
        }
      )
    }
    );
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
  openModal(id) {
    const dialogRef = this.dialog.open(PendingDetailsComponent, {
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
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
