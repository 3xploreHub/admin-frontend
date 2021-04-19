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
  @Input() booking: any;
  @Input() page: any;
  @Input() type: string;
  
  constructor(public router: Router, public mainService: AdminService) { }

  ngOnInit() {
    if (this.notif && this.notif.createdAt) {
    }
  }

  viewNotification() {
    this.mainService.viewNotification(this.notif._id).subscribe(
      response => {
        this.notif.opened = true
        const type = this.type
        if (type == "booking") {
          this.router.navigate(["/service-provider/view-booking", this.booking._id],
          { queryParams: { notification: true } })
        } else if (type == "page") {
          this.router.navigate(["/service-provider/dashboard", this.page.pageType, this.page._id],
            { queryParams: { notification: true } })
        }
        else if (type == "page-booking") {
          this.router.navigate(["./service-provider/view-booking-as-provider", this.booking.pageId, this.booking.bookingType, this.booking._id, this.booking.status],
            { queryParams: { notification: true } })
        }

      }

    )
  }

}

