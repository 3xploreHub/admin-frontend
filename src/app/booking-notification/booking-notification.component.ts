import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-notification',
  templateUrl: './booking-notification.component.html',
  styleUrls: ['./booking-notification.component.scss']
})
export class BookingNotificationComponent implements OnInit {
  hideShow = false;
  public data: any;
  public newNotif = true;
  public counter1 : any
  public counter2 : any
  public bookings:any;
  public pages:any
  keyWord: string = '';
  constructor(public adminService: AdminService, private router: Router, private route: ActivatedRoute) { }
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

  searchThis(event: any) {
    // this.data.filter = value.trim().toLocaleUpperCase()
    this.keyWord = event.target.value

  }
  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }

  goTo(clicked) {
    this.adminService.currentPath = clicked
    this.router.navigate(["/bookingNotif/"+clicked])
  }
  navBar(click){
    this.adminService.currentPath = click
    this.router.navigate([click])

  }

}
