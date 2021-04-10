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
  }
  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }

}
