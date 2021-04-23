import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifDetailsComponent } from './../notif-details/notif-details.component';

@Component({
  selector: 'app-pages-notifications',
  templateUrl: './pages-notifications.component.html',
  styleUrls: ['./pages-notifications.component.scss']
})
export class PagesNotificationsComponent implements OnInit {
  public pages: any;
  public processData: any;
  public bookings: any;
  public onlineData: any

  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public adminService: AdminService
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

    this.adminService.currentPath = this.router.url.split("/").reverse()[0]
    if (this.adminService.currentPath.includes("?")) this.adminService.currentPath = this.adminService.currentPath.split("?")[0]
    this.adminService.getAllBookings("Pending").subscribe((data)=>{
      this.bookings = data
    
    })
   
  }
  openModal(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '650px';
    dialogConfig.width = '600px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.data = id;
    const modalDialog = this.dialog.open(NotifDetailsComponent, dialogConfig);
  }

  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }
  toOnlinePage() {
    this.router.navigate(['/admin/pageToApprove/onlinePages']);

  }
  goTo(clicked) {
    this.adminService.currentPath = clicked
    this.router.navigate(["/admin/pageToApprove/" + clicked])
  }

}
