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
  public length:any
  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.adminService.getAllPendingNotifications("Online").subscribe((data) => {
      this.onlineData = data
      this.length = this.onlineData.length
      console.log("Length: ",this.length);
      
      if (this.adminService.bookingId) {
        console.log("booking accounts == ", this.processData)
        // this.processData.forEach(booking => {
        //   if (booking._id == this.adminService.bookingId) {
        //     console.log("here::::", booking)
        //     this.openModal
        //     (booking)
        //     this.adminService.bookingId = ""
        //   }
        // })
      }
    })
  }
  ngOnInit(): void {

  }
  // openModal(id: any) {
   
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.id = 'modal-component';
  //   dialogConfig.height = '650px';
  //   dialogConfig.width = '600px';
  //   dialogConfig.backdropClass = 'backdropBackground';
  //   dialogConfig.data = id;
  //   const modalDialog = this.dialog.open(NotifDetailsComponent, dialogConfig);
  // }
  openModal(id) {
    this.dialog.open(NotifDetailsComponent, {
      disableClose : false,
      id : 'modal-component',
      data : id,
      panelClass : 'custom-modalbox'
    });
  }
  

}
