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
  public types = {"date-input": "Date Input", "text-input": "Text Input", "number-input": "Number Input", "choices-input": "Choices Input"}
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

  getPageName(page) {
    let name = "------"
    page.components.forEach(comp => {
      if (comp.data.defaultName == "pageName") {
        name = comp.data.text
      }
    })
    return name;
  }

  getPendingPage(page) {
    const pageName = this.getPageName(page)
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
      message: `Your page <b>${pageName}</b> status has been set back to <b>Pending</b>`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.updatePendingPagesCount.emit()
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: `Your page <b>${pageName}</b> status has been set back to <b>Pending</b>` })
      this.closeDialog("Pending")
    })
  }

  getProcessPage(page) {
    const pageName = this.getPageName(page)
    const message = (page.status == "Online")? `Your page <b>${pageName}</b> status has been set back to <b>Processing</b>`: `Your page <b>${pageName}</b> status has been set to <b>Processing</b>`
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
      this.adminService.updatePendingPagesCount.emit()
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: message })
      this.closeDialog("Processing")
    })
  }

  toApprove(page) {
    const pageName = this.getPageName(page)
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
      message: `Your page <b>${pageName}</b> is now online`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.updatePendingPagesCount.emit()
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: `Your page <b>${pageName}</b> is now online` })
      this.closeDialog("Online")
    })
  }


  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
