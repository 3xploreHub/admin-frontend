import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// CommonJS
// const Swal = require('sweetalert2')
@Component({
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.css']
})
export class DeclinedComponent implements OnInit {

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
