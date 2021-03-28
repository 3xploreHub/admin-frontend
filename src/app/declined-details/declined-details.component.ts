import { AdminService } from './../service/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-declined-details',
  templateUrl: './declined-details.component.html',
  styleUrls: ['./declined-details.component.css']
})
export class DeclinedDetailsComponent implements OnInit {

  
  public booking = []
  public bookingData = [];
  public selectedService = [];
  public page = []
  constructor(public dialogRef: MatDialogRef<DeclinedDetailsComponent>,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data

  ) { }
  ngOnInit() {
    this.booking = Array.of(this.data)
    this.bookingData = this.data.bookingInfo
    this.selectedService = this.data.selectedServices
    this.page = Array.of(this.data.pageId.creator)
    console.log("jessa: ", this.selectedService);
    
    let bookingStatus = this.booking[0].status
    console.log("status: ",bookingStatus);
    console.log(this.booking);
  }

}
