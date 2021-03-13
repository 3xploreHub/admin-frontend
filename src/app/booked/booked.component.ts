import { MatTableDataSource } from '@angular/material/table';
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
  
];
@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {
  displayedColumns: string[] = ['id','touristSpotName', 'ownersName', 'location','dateProcess'];
  dataSource = new MatTableDataSource(ELEMENT_DATA) ;
  constructor() { }

  ngOnInit(): void {
  }

}
