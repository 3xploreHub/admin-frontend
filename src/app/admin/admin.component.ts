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
    this.adminService.getAllBookings("Pending").subscribe((data) => {
      this.bookings = data
      if(this.bookings.length === 0){
        this.counter1 ="";
      }else{
        this.counter1 = this.bookings.length
      }

    })

    this.adminService.getAllPendingNotifications("Pending").subscribe((data) => {
      this.pages = data   
      if(this.pages.length === 0){
        this.counter2=="";
      }else{
        this.counter2 = this.pages.length
      }

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