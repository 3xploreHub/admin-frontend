import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-notification',
  templateUrl: './booking-notification.component.html',
  styleUrls: ['./booking-notification.component.scss']
})
export class BookingNotificationComponent implements OnInit {
  public show=false
  public data: any;
  public newNotif = true;
  keyWord: string = '';
  constructor(public adminService: AdminService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.adminService.currentPath = this.router.url.split("/").reverse()[0]
    if (this.adminService.currentPath.includes("?")) this.adminService.currentPath = this.adminService.currentPath.split("?")[0]

  }

  goTo(clicked) {
    this.adminService.currentPath = clicked
    this.show = true
    this.router.navigate(["/admin/bookingNotif/"+clicked])
  }

}
