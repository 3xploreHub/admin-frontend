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
  keyWord: string = '';
  constructor(public adminService: AdminService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.adminService.currentPath = this.router.url.split("/").reverse()[0]
    if (this.adminService.currentPath.includes("?")) this.adminService.currentPath = this.adminService.currentPath.split("?")[0]
    
    // this.data = this.route.snapshot.firstChild ?.data.isHidden;
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.data = this.route.snapshot.firstChild ?.data.isHidden;
    //   }
    // });

    // dataEmit.filt

  }

  searchThis(event: any) {
    // this.data.filter = value.trim().toLocaleUpperCase()
    this.keyWord = event.target.value
    // console.log()

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
