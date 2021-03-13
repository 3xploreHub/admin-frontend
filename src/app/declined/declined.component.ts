import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// CommonJS
// const Swal = require('sweetalert2')


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
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.css']
})
export class DeclinedComponent implements OnInit {
  displayedColumns: string[] = ['touristSpotName', 'ownersName', 'location','dateProcess','id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA) ;
  constructor() { }

  ngOnInit(): void {
  }
  restore() {
    Swal.fire({
      // title: 'Are you sure?',
      text: "Are you sure You want to restore request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Request has been restored!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
}
