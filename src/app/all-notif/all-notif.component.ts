import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifDetailsComponent } from './../notif-details/notif-details.component';
@Component({
  selector: 'app-all-notif',
  templateUrl: './all-notif.component.html',
  styleUrls: ['./all-notif.component.css']
})

export class AllNotifComponent implements OnInit {
  public pages: any;
  public processData:any;
  public onlineData:any
  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.adminService.getAllPendingNotifications("Pending").subscribe((data) => {
      this.pages = data
    })
    this.adminService.getAllPendingNotifications("Processing").subscribe((data) => {
      this.processData = data
    })
    this.adminService.getAllPendingNotifications("Online").subscribe((data) => {
      this.onlineData = data
    })
  }
  ngOnInit(): void {

  }
  openModal(id: any) {
    // console.log(this.pages[0].status);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '650px';
    dialogConfig.width = '600px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.data = id;
    const modalDialog = this.dialog.open(NotifDetailsComponent, dialogConfig);
  }
  // toApprove(){
  //   alert("To approve")
  // }

}
