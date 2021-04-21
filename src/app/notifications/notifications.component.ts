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
  public notifications: any[] = []
  public loading: boolean = true;
  public counter1 : any
  public counter2 : any
  constructor(public mainService:AdminService, public router: Router) { }

  ngOnInit() {
    this.getNotifications();
    this.mainService.notification.subscribe(
      (data: any) => {
        this.getNotifications(true)
      }
    )
  }

  getNotifications(hideLoading = false) {
    this.mainService.getNotifications().subscribe(
      (notifications: any) => {
        notifications = notifications.map(notif => {
          const msgNotif = notif.notifications.filter(n => n.isMessage)
          if (msgNotif.length > 0) {
            msgNotif.forEach(msg => {
              if (!msg.opened) {
                const notifs = notif.notifications.filter(n => n._id != msg._id)
                notifs.push(msg);
                notif.notifications = notifs;
              }
            });
          }
          return notif
        })
        this.notifications = notifications;
        this.loading = false
      },
      error => {
      }
    )
  }

  logOut() {
    this.mainService.deleteToken();
    this.router.navigate(['login']);
  }


  getTitle(notif) {
    const curUser = this.mainService.user._id
    let title = "Untitled Page"
    if (notif.booking) {
      const bookingOwner  = notif.booking.tourist
      if (curUser == bookingOwner) {
        notif.page.components.forEach(comp => {
          if (comp.data.defaultName && comp.data.defaultName == "pageName") {
            title = `Your booking to "${comp.data.text}"`
          }
        });
      } else {
        title = `${notif.mainReceiver.fullName}'s booking`
      }
    }
    return title
  }
}