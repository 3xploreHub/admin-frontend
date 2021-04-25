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
    
  }
  ngOnInit(): void {
    this.getPages()
    this.adminService.notification.subscribe(
      (data:any) => {
        if (data.type == "page-status-edit") {
          this.onlineData = this.onlineData.map(page => {
            if (page._id == data.pageId) {
              page.status = data.status
            }
            return page
           })
        }
      }
    )
  }

  getPages() {
    this.adminService.getAllPendingNotifications("Online").subscribe((data) => {
      this.onlineData = data
      this.displayCurrentPage(this.onlineData)
      if (this.onlineData.length == 0) {
        this.length = ""
      } else {
        this.length = this.onlineData.length
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
  openModal(page) {
    const dialogRef= this.dialog.open(NotifDetailsComponent, {
      disableClose : false,
      id : 'modal-component',
      data : page,
      panelClass : 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onlineData = this.onlineData.filter(item =>  item._id != page._id)
       
      }
    });
  }
  

}
