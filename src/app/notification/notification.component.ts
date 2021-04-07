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
  keyWord: string = '';
  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
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

}




