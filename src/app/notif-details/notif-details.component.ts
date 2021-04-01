import { Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-notif-details',
  templateUrl: './notif-details.component.html',
  styleUrls: ['./notif-details.component.css']
})
export class NotifDetailsComponent implements OnInit {

  public pagesData:any
  constructor(public dialogRef: MatDialogRef<NotifDetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
    
    
    
    ) { }

  ngOnInit(){
    this.pagesData = Array.of(this.data)
    console.log(this.pagesData);
    
  }
  getProcessPage(page){ 
    const pageName = this.pagesData[0].components.name
    alert(page._id)
    const notif = {
      pageId: page._id,
      pageName: pageName,
      pageCreator: page.creator._id,
      status: "Processing",
      message:`You page ${pageName} is already on the process`,
  }
    this.adminService.setPageStatus(notif).subscribe((data)=>{
      console.log("data",data);   
      this.closeDialog()
    }) 
  }

  toApprove(page){
    const pageName = this.pagesData[0].components.name
    alert(page._id)
    const notif = {
      pageId: page._id,
      pageName: pageName,
      pageCreator: page.creator._id,
      status: "Online",
      message:`You page ${pageName} is already on the process`,
  }
    this.adminService.setPageStatus(notif).subscribe((data)=>{
      console.log("data",data);   
      this.closeDialog()
    }) 
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
