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
  public pages:any;
  constructor(private router: Router, 
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private adminService: AdminService
    ) {
      this.adminService.getAllPendingNotifications("Pending").subscribe((data)=>{
        this.pages = data
        console.log(this.pages);     
      })
     }
  ngOnInit(): void {
    
  }
  openModal(id){

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
