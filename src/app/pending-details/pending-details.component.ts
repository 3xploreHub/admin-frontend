import { AdminService } from './../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.scss']
})
export class PendingDetailsComponent implements OnInit {

  public booking =[]
  public bookingData = [];
  public selectedService = [];
  public itemDetails = [];
  public page=[]
  constructor(public dialogRef: MatDialogRef<PendingDetailsComponent>,
    private route:ActivatedRoute,
    private adminService:AdminService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data

    ) { }
  ngOnInit() {
    this.booking = Array.of(this.data) 
    this.bookingData = this.data.bookingInfo
    this.selectedService = this.data.selectedServices
    this.page = Array.of(this.data.pageId.creator)
    this.itemDetails = this.data.selectedServices[0].data
    
  }
  bookedFunction(id) {
    console.log(id);
    
    this.adminService.getBookedDetails(id).subscribe((data)=>{
      console.log("booked: ",data);
      
    })
    this.router.navigate(['/notif/booked'])
    this.closeModal();
  }
  declinedFunction(id) {
    this.adminService.getDeclineBookings(id).subscribe((data)=>{
      
    })
    this.router.navigate(['/notif/declined'])
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
