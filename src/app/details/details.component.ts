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
  public booking = [];
  public bookingData = [];
  public selectedService = [];
  public page = [];
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
    

  ) { }
  ngOnInit() {
    console.log("click: ",this.data);
    
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId);
  }

  declinedFunction(booking) {
    const pageName = "Tourist Spot Page"
    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      pageCreator: booking.pageId.creator._id,
      status: "Rejected",
      message:`You page ${pageName} is already on the process`,
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['/notif/declined']); 
    this.closeModal();
  }

  toBooked(booking) {
    const pageName = "Tourist Spot Page"
    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      pageCreator: booking.pageId.creator._id,
      status: "Booked",
      message:`You page ${pageName} is already on the process`,
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['/notif/booked']);
    this.closeModal();
  }

  toOnProcess(booking) {
    const pageName = "Tourist Spot Page"
    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      pageCreator: booking.pageId.creator._id,
      status: "Processing",
      message:`You page ${pageName} is already on the process`,
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['/notif/pending']);
    this.closeModal();
  }

  toPending(booking) {
    const pageName = "Tourist Spot Page"
    alert(booking._id)
    const notif = {
      bookingId: booking._id,
      pageName: pageName,
      pageCreator: booking.pageId.creator._id,
      status: "Pending",
      message:`You page ${pageName} is already on the process`,
  }
    this.adminService.setBookingStatus(notif).subscribe((data) => { });
    this.router.navigate(['notif/new']);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
