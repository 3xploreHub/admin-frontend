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

  public pages: any[] = []
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
    this.adminService.getAllPendingNotifications("Processing").subscribe((data:any) => {
      this.pages = [...this.pages,...data]
      this.displayCurrentPage(this.pages)
      this.pendingCount = this.pages.length
      console.log(this.pages);
    })

    this.adminService.getAllPendingNotifications("Pending").subscribe((data:any) => {
      this.pages = [...this.pages,...data]
      this.displayCurrentPage(this.pages)
      this.pendingCount = this.pages.length
    

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

    const dialogRef = this.dialog.open(NotifDetailsComponent, {
      disableClose: false,
      id: 'modal-component',
      data: page,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pages = this.pages.map(item => {
          if (item._id == page._id) {
            item.status = result
            if (result != "Online") return item
          }
          return item;
        })
        this.pages = this.pages.filter(page => page)
       
      }
    });
  }


}
