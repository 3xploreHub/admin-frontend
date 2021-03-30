import { AdminService } from './../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-notif-details',
  templateUrl: './notif-details.component.html',
  styleUrls: ['./notif-details.component.css']
})
export class NotifDetailsComponent implements OnInit {

  public pagesData=[]
  constructor(public dialogRef: MatDialogRef<NotifDetailsComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data
    
    
    ) { }

  ngOnInit(){
    console.log("sfgsfdg",this.data);
    // this.pagesData = Array.of(this.data)
    // console.log(this.pagesData);
    
    
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
