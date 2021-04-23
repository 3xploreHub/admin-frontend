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
  public onlineData: any;
  public pendingCount: any;
  public processCount: any;
  public pageNumCount: any


  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) { }
  ngOnInit(): void {
    this.adminService.getAllPendingNotifications("Processing").subscribe((data) => {
      this.processData = data
      this.displayCurrentPage(this.processData)
      this.processCount = this.processData.length
      if (this.pendingCount == 0 && this.processCount == 0) {
        this.pageNumCount = ""
      } else {
        this.pageNumCount = this.pendingCount + this.processCount
      }
    })
    
    this.adminService.getAllPendingNotifications("Pending").subscribe((data) => {
      this.pages = data
      this.displayCurrentPage(this.pages)
      this.pendingCount = this.pages.length
      if (this.pendingCount == 0 && this.processCount == 0) {
        this.pageNumCount = ""
      } else {
        this.pageNumCount = this.pendingCount + this.processCount
      }

    })
  }

  displayCurrentPage(data) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        data.forEach(page => {
          if (page._id == params.pageId) {
            this.openModal(page)
          }
        });
      }
    })
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
      disableClose: false,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });
  }


}
