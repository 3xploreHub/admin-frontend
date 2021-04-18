import { Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-notif-details',
  templateUrl: './notif-details.component.html',
  styleUrls: ['./notif-details.component.scss']
})
export class NotifDetailsComponent implements OnInit {
  public services: any;
  public pagesData: any
  constructor(public dialogRef: MatDialogRef<NotifDetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.pagesData = Array.of(this.data)
    this.services = this.data.services

    this.services = this.services.map(comp => {
      comp.data = comp.data.filter(data => data.defaultName != "quantity")
      return comp
    })
  }

  getPendingPage(page) {
    const pageName = this.pagesData[0].components.name
    alert(page._id)
    const notif = {
      pageId: page._id,
      pageName: pageName,
      pageCreator: page.creator._id,
      status: "Pending",
      message: `Your page ${pageName} return to Pending`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.closeDialog()
    })
    this.router.navigate(['/pageToApprove/pendingPages'])
  }
  getProcessPage(page) {
    const pageName = this.pagesData[0].components.name
    alert(page._id)
    const notif = {
      pageId: page._id,
      pageName: pageName,
      pageCreator: page.creator._id,
      status: "Processing",
      message: `Your page ${pageName} is already on the process`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.closeDialog()
    })
  }

  toApprove(page) {
    const pageName = this.pagesData[0].components.name
    alert(page._id)
    const notif = {
      pageId: page._id,
      pageName: pageName,
      pageCreator: page.creator._id,
      status: "Online",
      message: `Your page ${pageName} is now online`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.closeDialog()
    })
    this.router.navigate(['/pageToApprove/onlinePages'])
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
