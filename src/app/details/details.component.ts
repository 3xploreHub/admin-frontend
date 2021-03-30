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
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId.creator);
  }

  declinedFunction(id) {
    this.adminService.getDeclineBookings(id).subscribe((data) => { });
    this.router.navigate(['/notif/declined']);
    this.closeModal();
  }
  toBooked(id) {
    this.adminService.getBookedDetails(id).subscribe((data) => { });
    this.router.navigate(['/notif/booked']);
    this.closeModal();
  }
  toOnProcess(id) {
    this.adminService.getOnProcessBooking(id).subscribe((data) => { });
    this.router.navigate(['/notif/pending']);
    this.closeModal();
  }
  toPending(id) {
    this.adminService.getPendingBookings(id).subscribe((data) => { });
    this.router.navigate(['notif/new']);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
