import { Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public counter1: any
  public counter2: any
  public bookings: any;
  public pages: any
  constructor(public adminService: AdminService,
    public router: Router) { }
    
  ngOnInit(): void {
    this.getPendingBookingsCount()
    this.getPendingPagesCount()

    this.adminService.notification.subscribe((data: any) => {
      if (data.type == "page-submission") {
        this.getPendingPagesCount()
      }
      if (data.booking && data.booking.status == "Pending" || data.booking && data.booking.status == "Cancelled") {
        this.getPendingBookingsCount()
      }
    })
    this.adminService.updatePendingBookingCount.subscribe(data => {
      this.getPendingBookingsCount()
    })
    this.adminService.updatePendingPagesCount.subscribe(data => {
      this.getPendingPagesCount()
    })
  }

  getPendingBookingsCount() {
    this.adminService.getPendingBookingsCount().subscribe(count => {
      this.counter1 =  count != 0 ? count : ""
    })
  }

  getPendingPagesCount() {
    this.adminService.getPendingPagesCount().subscribe(count => {
      this.counter2 = count != 0 ? count : ""
    })
  }
  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }
  goTo(clicked) {
    this.adminService.currentPath = clicked
    this.router.navigate(["/admin/" + clicked])
  }
}