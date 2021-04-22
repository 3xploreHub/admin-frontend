import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
  @Input() notif: any = {
    _id: "",
    receiver: "",
    createdAt: "",
    message: "",
    opened: false,
  }

  @Input() notificationGroup:any;

  constructor(public router: Router, public mainService: AdminService) { }

  ngOnInit() {
    if (this.notif && this.notif.createdAt) {
    }
  }

  viewNotification() {
    this.mainService.viewNotification(this.notificationGroup._id).subscribe(
      response => {
        this.notif.opened = true
        const type = this.notificationGroup.type

        if (type.includes("booking")) {
          const status = { Pending: "new", Processing: "pending", Booked: "booked", Rejected: "declined" }
          if (status[this.notificationGroup.booking.status]) {
            this.router.navigate([`/bookingNotif/${status[this.notificationGroup.booking.status]}`], { queryParams: { bookingId: this.notificationGroup.booking._id } })
          } else {
            alert("Booking is no longer available")
          }
        }
        // if (type == "booking") {
        //   this.router.navigate(["/service-provider/view-booking", this.booking._id],
        //   { queryParams: { notification: true } })
        // } else if (type == "page") {
        //   this.router.navigate(["/service-provider/dashboard", this.page.pageType, this.page._id],
        //     { queryParams: { notification: true } })
        // }
        // else if (type == "page-booking") {
        //   this.router.navigate(["./service-provider/view-booking-as-provider", this.booking.pageId, this.booking.bookingType, this.booking._id, this.booking.status],
        //     { queryParams: { notification: true } })
        // }

      }

    )
  }

}

