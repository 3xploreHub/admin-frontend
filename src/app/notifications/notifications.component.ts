import { Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
// import { OnInit } from '@angular/core';
import { Component, OnInit,AfterViewInit } from '@angular/core';
// import { ngAfterViewInit } from '@angular/compiler';
import { notification } from '../Interface/notifications';
// import { MainServicesService } from '../provider-services/main-services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  // AfterViewInit
  // public notifications: notification[] = []
  // public loading: boolean = true;
  public counter1 : any
  public counter2 : any
  public bookings:any;
  public pages:any
  public opened=false;
  constructor(
    // public mainService:MainServicesService
    private adminService: AdminService,
    private router:Router
    ) { }

  // ngAfterViewInit() {
    // this.mainService.getNotifications().subscribe(
    //   (response: any) => {
    //     this.notifications = response.reverse();
    //     this.loading = false
    //   },
    //   error => {

    //   }
    // )
  // }
  ngOnInit(): void {
    this.adminService.currentPath = this.router.url.split("/").reverse()[0]
    if (this.adminService.currentPath.includes("?")) this.adminService.currentPath = this.adminService.currentPath.split("?")[0]
     //for Badge Number
     this.adminService.getAllBookings("Pending").subscribe((data)=>{
      this.bookings = data
      this.counter1 = this.bookings.length
    
    })
    this.adminService.getAllPendingNotifications("Pending").subscribe((data)=>{
      this.pages = data
      this.counter2 = this.pages.length
      
    })
  }
  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }

}
