import { AdminService } from './../service/admin.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  public booking : any;
  public bookingData :any ;
  public selectedService :any;
  public page : any;
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
    

  ) { }
  ngOnInit() {
    
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId);
    console.log("click: ",this.page);

  }

  declinedFunction(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName


    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      serviceProviderReceiver: booking.pageId.creator._id,
      status: "Rejected",
      messageForServiceProvider:`${touristName}'s booking was declined`,
      messageForTourist:`Your booking to "${pageName}" is have been declined`,
      touristReceiver:booking.tourist._id
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['/notif/declined']); 
    this.closeModal();
  }

  toBooked(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName


    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      serviceProviderReceiver: booking.pageId.creator._id,
      status: "Booked",
      messageForServiceProvider:`${touristName}'s booking is now granted`,
      messageForTourist:`Your booking to "${pageName}" is has been granted`,
      touristReceiver:booking.tourist._id
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['/notif/booked']);
    this.closeModal();
  }

  toOnProcess(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName


    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      serviceProviderReceiver: booking.pageId.creator._id,
      status: "Processing",
      messageForServiceProvider:`${touristName}'s booking is on process`,
      messageForTourist:`Your booking to "${pageName}" is now on process`,
      touristReceiver:booking.tourist._id
  }
  console.log();
  
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['/notif/pending']);
    this.closeModal();
  }

  toPending(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      serviceProviderReceiver: booking.pageId.creator._id,
      status: "Pending",
      messageForServiceProvider:`${touristName}'s booking is still pending`,
      messageForTourist:`Your booking to "${pageName}" is still pending`,
      touristReceiver:booking.tourist._id
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['notif/new']);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
