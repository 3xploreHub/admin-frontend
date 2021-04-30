import { Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

// CommonJS
// const Swal = require('sweetalert2')

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public show = true
  public counter1: any
  public counter2: any
  public bookings: any;
  public pages: any
  constructor(public adminService: AdminService,
    public router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllBookings("Pending").subscribe((data) => {
      this.bookings = data
      if (this.bookings.length === 0) {
        this.counter1 = "";
      } else {
        this.counter1 = this.bookings.length
      }

    })

    this.adminService.getAllPendingNotifications("Pending").subscribe((data) => {
      this.pages = data
      if (this.pages.length === 0) {
        this.counter2 == "";
      } else {
        this.counter2 = this.pages.length
      }

    })
  }
  logOut() {
    Swal.fire({
      // toast:true,
      position: 'top-end',
      title: 'Are you sure you want to logout?',
      confirmButtonText: `Yes`,
      confirmButtonColor: 'rgb(11, 155, 30)',
      width: 400,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteToken();
        this.router.navigate(['login']);
      }
    })

  }
  goTo(clicked) {
    this.show = false
    this.adminService.currentPath = clicked
    this.show=true
    this.router.navigate(["/admin/" + clicked])
  }
}
