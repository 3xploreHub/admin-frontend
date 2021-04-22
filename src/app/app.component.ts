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
  title = 'admin-explorehub';

  constructor(public adminService: AdminService) {
  }

  ngOnInit() {
    if (this.notifHandler) {
      this.notifHandler.init()
    }
  }

  ngAfterViewInit() {
      this.notifHandler.init();
  }

  ngOnDestroy() {
    this.notifHandler.disconnect();
  }
}
