import { AdminService } from './../service/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public bookingData = [];
  public selectedService = [];
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    private route:ActivatedRoute,
    private adminService:AdminService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data

    ) { }
  ngOnInit() {
    
    this.bookingData = this.data.bookingInfo
    this.selectedService = this.data.selectedServices
    console.log("bookingData: ",this.bookingData);
    console.log("service: ",this.selectedService);

    // this.

    // this.adminService.viewBooking(bookingId).subscribe(data=>{
    //   console.log("Booking data: ",data);
    // });
    // this.route.paramMap.subscribe(param => {
    //   const bookingId = param.get("bookingId");
    //   this.adminService.viewBooking(bookingId).subscribe(
    //     ( bookingData) => {
    //       console.log(bookingData);
    //     }
    //   )
    // })
    // console.log("ahfdoufh");
    
  }
  

  actionFunction() {
    // this.adminService.pendingBooking(bookingId).subscribe()
    this.router.navigate(['/notif/pending'])
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
export interface BookingData{

}