import { PendingDetailsComponent } from './../pending-details/pending-details.component';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

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
    const modalDialog = this.dialog.open(PendingDetailsComponent, dialogConfig);
  }

}
