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
  public pageName: string;
  public pageLocation: string;
  public pageCreator: string
  public photo: string = "";
  public booking: any = { _id: "", tourist: { _id: "" }, pageId: { _id: "" } }
  public bookingData: any
  public modalContainerHeight: number;
  public selectedService = []
  public page: any;
  public pagePhoto: string;
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data


  ) {
    // this.bookingData =  {_id:"", tourist: {_id: ""}, pageId:{_id:""}}
  }
  ngOnInit() {

    this.booking = this.data;
    this.bookingData = this.data.bookingInfo;
    console.log(this.data, 'booking');

    // this.data.selectedServices[0].data.defaultName.splice("quantity",1)
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId);
    // this.selectedService = this.selectedService.map(comp => {
    //   comp.service.data = comp.service.data.filter(data => data.defaultName != "quantity")
    //   return comp
    // })
    console.log(this.bookingData);

    this.modalContainerHeight = window.innerHeight - 200;
    const pageNameComp = this.getDefaultValue("pageName")
    const barangay = this.getDefaultValue("barangay")
    const municipality = this.getDefaultValue("municipality")
    const province = this.getDefaultValue("province")
    this.pagePhoto = this.getItemValue(this.page[0].components, "photo", true)
    this.pageName = pageNameComp.length > 0 ? pageNameComp[0].data.text : "Untitled"
    this.pageCreator = this.page[0].creator.fullName
    this.pageLocation = barangay[0].data.text + ", " + municipality[0].data.text + ", " + province[0].data.text
  }

  getDefaultValue(type) {
    return this.page[0].components.filter(data => {
      if (data.data && typeof data.data == "object" && data.data.defaultName == type) {
        return data
      }
    })
  }

  displayValue(value, type) {
    if (type == "date-input") {
      return `${value.month.text} ${value.day.text}, ${value.year.text}`
    } else if (type == "number-input" || type == "text-input") {
      return value
    } else {
      value = value.map(v => v.text)
      return value.join(", ")
    }
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

  getItemValue(components, type, notDefault = false) {
    let value = "--------"
    components.forEach(element => {

      if (!notDefault && element.data.defaultName == type) {
        value = element.data.text
      } else if (notDefault && element.type == type) {
        value = element.data.length ? element.data[0].url : null
      }
    });
    return value
  }

  checkAvailability(data, type) {
    return new Promise((resolve, reject) => {
      let hasAvailable = true;
      data.selectedServices.forEach(item => {
        const service = item.service
        let quantity = this.getValue(service.data, "quantity")
        let total = service.booked + service.manuallyBooked + service.toBeBooked + service.pending
        if (type == "counted") total = total - item.quantity;
        if (total + item.quantity > quantity) {
          this.dialogService.openConfirmedDialog(this.getValue(service.data, "name") + " has no more available item")
          hasAvailable = false
          return;
        }
      })
      resolve(hasAvailable)
    });
  }

  toBooked(booking) {
    const pageName = this.pageName
    const touristName = this.booking.tourist.fullName
    let valid = true;
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        const toBeBooked = booking.status == "Processing" ? serviceData.toBeBooked - item.quantity : serviceData.toBeBooked
        if (serviceData.booked + serviceData.manuallyBooked + toBeBooked + item.quantity > this.getValue(serviceData.data, "quantity")) {
          this.dialogService.openConfirmedDialog(this.getValue(serviceData.data, "name") + " has no more available item")
          valid = false
        } else {
          if (item.isManual) {
            service["bookingData"] = { manuallyBooked: serviceData.manuallyBooked + item.quantity }
          }
          else {
            service["bookingData"] = { booked: serviceData.booked + item.quantity, toBeBooked: toBeBooked }
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
          page: booking.pageId._id,
          status: "Booked",
          mainReceiver: booking.tourist._id,
          messageForServiceProvider: `${touristName}'s booking has been confirmed`,
          messageForTourist: `Your booking to "${pageName}" has been granted`,
          touristReceiver: booking.tourist._id
        }
        const type = booking.status == "Rejected" ? "" : "counted"
        this.checkAvailability(bookingData, "").then(hasAvailable => {
          if (hasAvailable) {
            this.adminService.setBookingStatus(notif).subscribe((data: any) => {
              this.adminService.notify({ user: this.adminService.user, booking: data, type: "Booked_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Your booking status was set to Processing` })
              this.dialogRef.close(data._id)
            });
          }
        })
      }
    })
  }



  toOnProcess(booking) {
    const pageName = this.pageName
    const touristName = this.booking.tourist.fullName
    this.adminService.getBooking(booking._id).subscribe(
      (bookingData: any) => {
        let servicesToUpdate = bookingData.selectedServices.map(item => {
          const serviceData = item.service

          let service = { _id: serviceData._id, bookingData: { toBeBooked: serviceData.toBeBooked + item.quantity, pending: serviceData.pending - item.quantity } }
          return service
        })
        const notif = {
          bookingId: booking._id,
          pageName: pageName,
          servicesToUpdate: servicesToUpdate,
          serviceProviderReceiver: booking.pageId.creator._id,
          page: booking.pageId._id,
          status: "Processing",
          mainReceiver: booking.tourist._id,
          messageForServiceProvider: `${touristName}'s booking is on process`,
          messageForTourist: `Your booking to "${pageName}" is now on process`,
          touristReceiver: booking.tourist._id
        }
        const type = booking.status == "Rejected" ? "" : "counted"
        this.checkAvailability(bookingData, type).then(hasAvailable => {
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
    const pageName = this.pageName
    const touristName = this.booking.tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        const serviceData = item.service
        let service = { _id: serviceData._id, bookingData: { toBeBooked: serviceData.toBeBooked + item.quantity } }
        if (booking.status == "Booked") {
          service.bookingData["booked"] = serviceData.booked - item.quantity
        }
        return service
      })
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        page: booking.pageId._id,
        mainReceiver: booking.tourist._id,
        status: "Processing",
        messageForServiceProvider: `${touristName}'s booking has been set back to processing`,
        messageForTourist: `Your booking to "${pageName}" has been set back to processing`,
        touristReceiver: booking.tourist._id
      }
      this.checkAvailability(bookingData, "counted").then(hasAvailable => {
        if (hasAvailable) {
          this.adminService.setBookingStatus(notif).subscribe((data: any) => {
            this.adminService.notify({ user: this.adminService.user, booking: data, type: "Processing_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Processing` })
            this.dialogRef.close(data._id)
          });
        }
      })
    })
  }

  toPending(booking) {
    const pageName = this.pageName
    const touristName = this.booking.tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate;

      servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        if (bookingData.status == "Booked") {
          service["bookingData"] = { booked: serviceData.booked - item.quantity, pending: serviceData.pending + item.quantity }
        } else if (bookingData.status == "Processing") {
          service["bookingData"] = { toBeBooked: serviceData.toBeBooked - item.quantity, pending: serviceData.pending + item.quantity }
        } else if (bookingData.status == "Rejected") {
          service["bookingData"] = { pending: serviceData.pending + item.quantity }
        }
        return service
      })

      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        page: booking.pageId._id,
        mainReceiver: booking.tourist._id,
        status: "Pending",
        messageForServiceProvider: `${touristName}'s has been set back to pending`,
        messageForTourist: `Your booking to "${pageName}" has been set back to pending`,
        touristReceiver: booking.tourist._id
      }
      this.checkAvailability(bookingData, "").then(hasAvailable => {
        if (hasAvailable) {
          this.adminService.setBookingStatus(notif).subscribe((data: any) => {
            this.adminService.notify({ user: this.adminService.user, booking: data, type: "Pending_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Pending` })
            this.dialogRef.close(data._id)
          });
        }
      })
    })
  }

  returnToPending(booking) {
    const pageName = this.pageName
    const touristName = this.booking.tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        if (bookingData.status == "Booked") {
          service["bookingData"] = { booked: serviceData.booked - item.quantity, pending: serviceData.pending + item.quantity }
        } else if (bookingData.status == "Processing") {
          service["bookingData"] = { toBeBooked: serviceData.toBeBooked - item.quantity, pending: serviceData.pending + item.quantity }
        }
        return service
      })
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        page: booking.pageId._id,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        mainReceiver: booking.tourist._id,
        status: "Pending",
        messageForServiceProvider: `${touristName}'s has been set back to pending`,
        messageForTourist: `Your booking to "${pageName}" has been set back to pending`,
        touristReceiver: booking.tourist._id
      }
      console.log(notif);
      this.checkAvailability(bookingData, "counted").then(hasAvailable => {
        if (hasAvailable) {
          this.adminService.setBookingStatus(notif).subscribe((data: any) => {
            this.adminService.notify({ user: this.adminService.user, booking: data, type: "Pending_booking-fromAdmin", receiver: [data.pageId.creator, data.tourist._id], message: `Admin moved a booking to Pending` })
            this.dialogRef.close(data._id)
          });
        }
      })
    })
  }

  declinedFunction(booking) {
    const pageName = this.pageName
    const touristName = this.booking.tourist.fullName
    this.adminService.getBooking(booking._id).subscribe((bookingData: any) => {
      let servicesToUpdate = bookingData.selectedServices.map(item => {
        let service = { _id: item.service._id }
        const serviceData = item.service
        if (bookingData.status == "Booked") {
          service["bookingData"] = { booked: serviceData.booked - item.quantity }
        } else if (bookingData.status == "Processing") {
          service["bookingData"] = { toBeBooked: serviceData.toBeBooked - item.quantity }
        } else if (bookingData.status == "Pending") {
          service["bookingData"] = { pending: serviceData.pending - item.quantity }
        }
        return service
      })
      const notif = {
        bookingId: booking._id,
        pageName: pageName,
        servicesToUpdate: servicesToUpdate,
        serviceProviderReceiver: booking.pageId.creator._id,
        page: booking.pageId._id,
        mainReceiver: booking.tourist._id,
        status: "Rejected",
        messageForServiceProvider: `${touristName}'s booking was declined`,
        messageForTourist: `Your booking to "${pageName}" was declined`,
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
