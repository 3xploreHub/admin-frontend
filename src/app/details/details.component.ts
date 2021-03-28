import { AdminService } from './../service/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
 
  public booking = []
  public bookingData = [];
  public selectedService = [];
  public page = []
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
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


  actionFunction(id) {
    console.log(id);
    this.adminService.getOnProcessBooking(id).subscribe((data) => {
    })
    this.router.navigate(['/notif/pending'])
    this.closeModal();
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
