import { MatTableDataSource } from '@angular/material/table';
import { PendingDetailsComponent } from './../pending-details/pending-details.component';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';




export interface PeriodicElement {
  id:number;
  touristSpotName: string;
  ownersName: string;
  location: string;
  dateProcess: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1, touristSpotName:" Basdaku Beach Resort", ownersName: 'Jhonny Bravo', location: "Moalboal, Cebu", dateProcess: "10/2/21"},
  {id:2, touristSpotName:" Basdaku Beach Resort", ownersName: 'Jhonny Bravo', location: "Moalboal, Cebu", dateProcess: "10/2/21"},
  
];
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'touristSpotName', 'ownersName', 'location','dateProcess'];
  dataSource = new MatTableDataSource(ELEMENT_DATA) ;
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
