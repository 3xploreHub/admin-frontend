import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  @Input() position: string = "left";
  showDate = false;
  @Input() message: any = {
    _id: "", sender: "", senderFullName: "", message: "", createdAt: null, updatedAt: null, noSender: false
  }
  constructor(
    public adminService:AdminService
  ) { 

  }

  ngOnInit() {

  }

}
