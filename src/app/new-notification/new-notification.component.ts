import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from './../details/details.component';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PusherService } from '../pusher.service';


export interface PeriodicElement {
  id: number;
  touristSpotName: string;
  ownersName: string;
  location: string;
  dateProcess: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, touristSpotName: " Basdaku Beach Resort", ownersName: 'Jhonny Bravo', location: "Moalboal, Cebu", dateProcess: "10/2/21" },

];

@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})
export class NewNotificationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'touristSpotName', 'ownersName', 'location', 'dateProcess'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(public dialog: MatDialog, private pusherService: PusherService) { }

  ngOnInit(): void {
    //pusher
    this.pusherService.messagesChannel.bind('my-event', (message) => {
      ELEMENT_DATA.push(message)
      this.dataSource.data = ELEMENT_DATA;
      console.log(message)
    });
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "550px";
    dialogConfig.width = "700px";
    dialogConfig.backdropClass = "backdropBackground";
    const modalDialog = this.dialog.open(DetailsComponent, dialogConfig);
  }
  // applyFilter(filterValue:string){
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}