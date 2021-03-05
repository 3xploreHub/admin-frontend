import { Component, OnInit } from '@angular/core';
// import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({ name: 'appFilter' })
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

  public data = [
    "Jessa Mae"
  ]
  public newNotif: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  filter(value: string) {
    // this.data.filter = value.trim().toLocaleUpperCase()


  }
}

// @Component({
//   selector: 'view-details',
//   templateUrl: 'view-details.html',
// })
// export class ViewDetails {}





