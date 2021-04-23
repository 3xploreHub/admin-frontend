import { NotifDetailsComponent } from './../notif-details/notif-details.component';
import { AdminService } from './../service/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-pages-notification',
  templateUrl: './online-pages-notification.component.html',
  styleUrls: ['./online-pages-notification.component.scss']
})
export class OnlinePagesNotificationComponent implements OnInit {
  public pages: any;
  public processData: any;
  public onlineData: any;
  public length: any
  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.adminService.getAllPendingNotifications("Online").subscribe((data) => {
      this.onlineData = data

      if (this.onlineData.length == 0) {
        this.length = ""
      } else {
        this.length = this.onlineData.length
      }

      // if (this.adminService.bookingId) {
      // this.processData.forEach(booking => {
      //   if (booking._id == this.adminService.bookingId) {
      //     this.openModal
      //     (booking)
      //     this.adminService.bookingId = ""
      //   }
      // })
      // }
    })
  }
  ngOnInit(): void {

  }
  openModal(id) {
    this.dialog.open(NotifDetailsComponent, {
      disableClose: false,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });
  }


}
