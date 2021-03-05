import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from './../details/details.component';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})
export class NewNotificationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "550px";
    dialogConfig.width = "700px";
    dialogConfig.backdropClass="backdropBackground";
    const modalDialog = this.dialog.open(DetailsComponent, dialogConfig);
  }

}
