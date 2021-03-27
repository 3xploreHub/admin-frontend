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
  public bookingStatus = false;
  public booking = []
  public bookingData = [];
  public selectedService = [];
  // public itemDetails = [];
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
    // this.itemDetails = this.data.selectedServices[0].data
    console.log("jessa: ", this.booking);

  }


  actionFunction(id) {
    console.log(id);
    this.adminService.getOnProcessBooking(id).subscribe((data) => {
    })
    this.router.navigate(['/notif/pending'])
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
