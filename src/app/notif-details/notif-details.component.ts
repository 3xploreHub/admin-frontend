import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-notif-details',
  templateUrl: './notif-details.component.html',
  styleUrls: ['./notif-details.component.scss']
})
export class NotifDetailsComponent implements OnInit {
  public services: any;
  public modalContainerHeight: number;
  public pagesData: any
  tabIndex;

  constructor(public route: ActivatedRoute, public dialogRef: MatDialogRef<NotifDetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
    ) { 

      this.goToConversation()
    }

  ngOnInit() {
    this.modalContainerHeight = window.innerHeight - 200;
    this.pagesData = Array.of(this.data)
    this.services = this.data.services
    

    this.services = this.services.map(comp => {
      comp.data = comp.data.filter(data => data.defaultName != "quantity")
      return comp
    })
  }

  goToConversation() {

      this.route.queryParams.subscribe(
        (params: any) => {

          if (params.pageId) {
            console.log(params.pageId)
            this.tabIndex = 2;
          }
        }
      )
  }

  // receiver: this.tourist,
  // mainReceiver: this.tourist,
  // page: this.pageId,
  // booking: this.bookingId,
  // sender: this.mainService.user._id,
  // isMessage: true,
  // subject: this.bookingId,
  // message: 'Admin sent you a message',
  // type: this.bookingId ? "booking-tourist" : "page-provider",

  getPendingPage(page) {
    const pageName = this.pagesData[0].components.name
    const notif = {
      page: page._id,
      pageName: pageName,
      mainReceiver: page.creator._id,
      receiver: page.creator._id,
      sender: this.adminService.user._id,
      pageCreator: page.creator._id,
      subject: page._id,
      type: "page-provider",
      status: "Pending",
      message: `Your page "${pageName}" status has been set back to Pending`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: `Your page ${pageName} status has been set back to Pending` })
      this.closeDialog("Pending")
    })
  }

  getProcessPage(page) {
    const pageName = this.pagesData[0].components.name
    const message = (page.status == "Online")? `Your page "${pageName}" status has been set back to "Processing"`: `Your page "${pageName}" is already on the process`
    const notif = {
      page: page._id,
      pageName: pageName,
      mainReceiver: page.creator._id,
      receiver: page.creator._id,
      sender: this.adminService.user._id,
      pageCreator: page.creator._id,
      subject: page._id,
      type: "page-provider",
      status: "Processing",
      message: message,
    }
    // this.adminService.notify({ user: this.adminService.user, bookingId: this.booking._id, type: "Cancelled_booking-provider", receiver: notificationData.receiver, message: notificationData.message })
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: message })
      this.closeDialog("Processing")
    })
  }

  toApprove(page) {
    const pageName = this.pagesData[0].components.name
    const notif = {
      page: page._id,
      pageName: pageName,
      mainReceiver: page.creator._id,
      receiver: page.creator._id,
      sender: this.adminService.user._id,
      pageCreator: page.creator._id,
      subject: page._id,
      type: "page-provider",
      status: "Online",
      message: `Your page "${pageName}" is now online`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: `Your page ${pageName} is now online` })
      this.closeDialog("Online")
    })
  }
  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
