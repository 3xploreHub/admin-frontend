import { DialogService } from './../service/dialog.service';
import { AdminService } from './../service/admin.service';
import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  public photo: string = "";
  public booking: any;
  public bookingData: any;
  public modalContainerHeight: number;
  public selectedService: any;
  public page: any;
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data


  ) { }
  ngOnInit() {
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    // this.data.selectedServices[0].data.defaultName.splice("quantity",1)
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId);
    this.selectedService = this.selectedService.map(comp => {
      comp.data = comp.data.filter(data => data.defaultName != "quantity")
      return comp
    })

    this.modalContainerHeight = window.innerHeight - 200;

    // quantity.forEach(el => {

    //   if(el.defaultName == "quantity"){
    //   let quant = el.defaultName
    //     quantity.splice(quant,1,1)    
    //   }
    // });
  }

  getValue(components, type) {
    let result = type == "quantity" ? 0 : "Untitled"
    components.forEach(comp => {
      const data = comp.data
      if (data.defaultName && data.defaultName == type) {
        result = data.text
      }
    });
    return result
  }

  checkAvailability(data) {
    return new Promise((resolve, reject) => {
      let hasAvailable = true;
      data.selectedServices.forEach(item => {
        const service = item.service
        let quantity = this.getValue(service.data, "quantity")
        if (service.booked + service.manuallyBooked + service.toBeBooked + 1 > quantity) {
          this.dialogService.openConfirmedDialog(this.getValue(service.data, "name") + " has no more available item")
          hasAvailable = false
          return;
        }
      })
      resolve(hasAvailable)
    });
  }

  toBooked(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    let valid = true;
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        const toBeBooked = serviceData.toBeBooked - 1
        if (serviceData.booked + serviceData.manuallyBooked + toBeBooked + 1 > this.getValue(serviceData.data, "quantity")) {
          this.dialogService.openConfirmedDialog(this.getValue(serviceData.data, "name") + " has no more available item")
          valid = false
        } else {
          if (item.isManual) {
            service["bookingData"] = { manuallyBooked: serviceData.manuallyBooked + 1 }
          }
          else {
            service["bookingData"] = { booked: serviceData.booked + 1, toBeBooked: toBeBooked }
          }
        }
        return service
      })
      if (valid) {
        const notif = {
          bookingId: booking._id,
          pageName: pageName,
          servicesToUpdate: servicesToUpdate,
          serviceProviderReceiver: booking.pageId.creator._id,
          status: "Booked",
          messageForServiceProvider: `${touristName}'s booking is now granted`,
          messageForTourist: `Your booking to "${pageName}" has been granted`,
          touristReceiver: booking.tourist._id
        }
        this.adminService.setBookingStatus(notif).subscribe((data: any) => {
          this.adminService.notify({ user: this.adminService.user, booking: data, type: "Booked_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Processing` })
          this.dialogRef.close(data._id)
        });
      }
    })
  }



  toOnProcess(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    this.adminService.getBooking(booking._id).subscribe(
      (bookingData: any) => {
        let servicesToUpdate = bookingData.selectedServices.map(item => {
          const serviceData = item.service
          let service = { _id: serviceData._id, bookingData: { toBeBooked: serviceData.toBeBooked + 1 } }
          return service
        })
        const notif = {
          bookingId: booking._id,
          pageName: pageName,
          servicesToUpdate: servicesToUpdate,
          serviceProviderReceiver: booking.pageId.creator._id,
          status: "Processing",
          messageForServiceProvider: `${touristName}'s booking is on process`,
          messageForTourist: `Your booking to "${pageName}" is now on process`,
          touristReceiver: booking.tourist._id
        }

        this.checkAvailability(bookingData).then(hasAvailable => {
          if (hasAvailable) {
            this.adminService.setBookingStatus(notif).subscribe((data: any) => {
              this.adminService.notify({ user: this.adminService.user, booking: data, type: "Processing_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Processing` })
              this.dialogRef.close(data._id)

            });
          }
        })
      }
    )
  }

  returnToOnProcess(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        const serviceData = item.service
        let service = { _id: serviceData._id, bookingData: { toBeBooked: serviceData.toBeBooked + 1 } }
        if (booking.status == "Booked") {
          service.bookingData["booked"] = serviceData.booked - 1
        }
        return service
      })
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        status: "Processing",
        messageForServiceProvider: `${touristName}'s booking is on process`,
        messageForTourist: `Your booking to "${pageName}" is now on process`,
        touristReceiver: booking.tourist._id
      }

      this.adminService.setBookingStatus(notif).subscribe((data: any) => {
        this.adminService.notify({ user: this.adminService.user, booking: data, type: "Processing_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Processing` })
        this.dialogRef.close(data._id)
      });
    })
  }

  toPending(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate;
      if (bookingData.status == "Processing") {
        servicesToUpdate = bookingData.selectedServices.map(item => {
          let service = { _id: item.service._id }
          const serviceData = item.service
          if (bookingData.status == "Booked") {
            service["bookingData"] = { booked: serviceData.booked - 1 }
          } else if (bookingData.status == "Processing") {
            service["bookingData"] = { toBeBooked: serviceData.toBeBooked - 1 }
          }
          return service
        })
      }
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        status: "Pending",
        messageForServiceProvider: `${touristName}'s booking is still pending`,
        messageForTourist: `Your booking to "${pageName}" was returned to pending`,
        touristReceiver: booking.tourist._id
      }
      this.adminService.setBookingStatus(notif).subscribe((data: any) => {
        this.adminService.notify({ user: this.adminService.user, booking: data, type: "Pending_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Pending` })
        this.dialogRef.close(data._id)
      });
    })
  }

  returnToPending(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        if (bookingData.status == "Booked") {
          service["bookingData"] = { booked: serviceData.booked - 1 }
        } else if (bookingData.status == "Processing") {
          service["bookingData"] = { toBeBooked: serviceData.toBeBooked - 1 }
        }
        return service
      })
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        status: "Pending",
        messageForServiceProvider: `${touristName}'s booking is still pending`,
        messageForTourist: `Your booking to "${pageName}" was returned to pending`,
        touristReceiver: booking.tourist._id
      }
      console.log(notif);

      this.adminService.setBookingStatus(notif).subscribe((data: any) => {
        this.adminService.notify({ user: this.adminService.user, booking: data, type: "Pending_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Pending` })
        this.dialogRef.close(data._id)
      });
    })
  }

  declinedFunction(booking) {
    const pageName = this.page[0].components.name
    const touristName = this.booking[0].tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        if (bookingData.status == "Booked") {
          service["bookingData"] = { booked: serviceData.booked - 1 }
        } else if (bookingData.status == "Processing") {
          service["bookingData"] = { toBeBooked: serviceData.toBeBooked - 1 }
        }
        return service
      })
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        status: "Rejected",
        messageForServiceProvider: `${touristName}'s booking was declined`,
        messageForTourist: `Your booking to "${pageName}" has been declined`,
        touristReceiver: booking.tourist._id
      }
      this.adminService.setBookingStatus(notif).subscribe((data: any) => {
        this.adminService.notify({ user: this.adminService.user, booking: data, type: "Rejected_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin declined a booking` })
        this.dialogRef.close(data._id)
      });
    })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
