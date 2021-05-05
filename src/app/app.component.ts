import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotificationHandlerComponent } from './notification-handler/notification-handler.component';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,AfterViewInit, OnDestroy {
  @ViewChild(NotificationHandlerComponent) public notifHandler: NotificationHandlerComponent;
  title:string = 'admin-explorehub';
  processingTimeEnded:boolean = false;

  constructor(public adminService: AdminService) {
  }


  ngOnInit() {
    if (this.notifHandler) {
      this.notifHandler.init()
    }
    this.adminService.processingTimeEnded.subscribe(
      data => {
        this.processingTimeEnded = true;
        setTimeout(() => {
          this.processingTimeEnded = false;
        }, 9000);
      }
    )
  }

  ngAfterViewInit() {
      this.notifHandler.init();
  }

  goToProcessingTab() {
    this.processingTimeEnded = false
    this.adminService.changeTab.emit("processing")
  }

  ngOnDestroy() {
    this.notifHandler.disconnect();
  }
}
