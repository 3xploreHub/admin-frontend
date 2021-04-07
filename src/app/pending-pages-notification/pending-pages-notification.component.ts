import { NotifDetailsComponent } from './../notif-details/notif-details.component';
import { AdminService } from './../service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-pages-notification',
  templateUrl: './pending-pages-notification.component.html',
  styleUrls: ['./pending-pages-notification.component.scss']
})
export class PendingPagesNotificationComponent implements OnInit {

  public pages: any;
  public processData: any;
  public onlineData: any
  public creator:any;
  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.adminService.getAllPendingNotifications("Pending").subscribe((data) => {
      this.pages = data
      console.log("pending: ",this.pages);
      
    })
    this.adminService.getAllPendingNotifications("Processing").subscribe((data) => {
      this.processData = data
      this.creator = Array.of(this.processData[0].creator);
      console.log("processing: ",this.processData);

    })
  }

  ngOnInit(): void {
  }

  openModal(id: any) {
    // console.log(this.pages[0].status);
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '650px';
    dialogConfig.width = '600px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.data = id;
    const modalDialog = this.dialog.open(NotifDetailsComponent, dialogConfig);
  }
  

}
