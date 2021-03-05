import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  }

  actionFunction() {
    this.router.navigate(['/notif/pending'])
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
