import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';

// import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({ name: 'appFilter' })
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {
  hideShow = false;
  public data: any;



  public newNotif = true;
  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.data = this.route.snapshot.firstChild ?.data.isHidden;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.data = this.route.snapshot.firstChild ?.data.isHidden;
      }
    });

  }

  filter(value: string) {
    // this.data.filter = value.trim().toLocaleUpperCase()


  }
  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }
  // toAllNotif() {
  //   if (!this.hideShow) {
  //     this.hideShow = true;
  //     console.log("adto");
  //    return this.router.navigate(['/notif/allNotif'])
  //   } else {
  //     return this.hideShow = false;
  //   }
  // }

}


// @Component({
//   selector: 'view-details',
//   templateUrl: 'view-details.html',
// })
// export class ViewDetails {}





