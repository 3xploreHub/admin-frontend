import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.css']
})
export class PendingDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PendingDetailsComponent>,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
  }
  bookedFunction() {
    this.router.navigate(['/notif/booked'])
    this.closeModal();
  }
  declinedFunction() {
    this.router.navigate(['/notif/declined'])
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
