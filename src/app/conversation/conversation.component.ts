import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../service/admin.service';
export interface message {
  _id: string;
  sender: string;
  senderFullName: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  noSender: boolean
}
export interface conversation {
  _id: string;
  page: any;
  booking: any;
  messages: message[];
  createdAt: string;
  updatedAt: string;
  opened: boolean;
}

export enum receiver {
  owner = "owner",
  admin = "admin"
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @ViewChild('messagesCont') private messagesContainer: ElementRef;
  public screenHeight: number;
  public message: string;
  @Input() bookingId: string;
  @Input() pageId: string;
  @Input() tourist: string;
  public conversation: conversation;
  public messages: any[] = []
  constructor(public route: ActivatedRoute, public mainService: AdminService) { }

  ngOnInit() {
    this.screenHeight = window.innerHeight - 190
    // this.route.queryParams.subscribe(params => {
    //   if (params) {
    //     this.bookingId = params.bookingId
    //     this.pageId = params.pageId
    //     this.tourist = params.tourist
    this.mainService.getConversation(this.bookingId, this.pageId, this.mainService.user._id).subscribe(
      (response: any) => {
        if (!response.noConversation) {
          this.conversation = response
          this.messages = this.conversation.messages
          this.formatData()
        }
        setTimeout(() => {
          this.scrollToBottom()
        }, 400)
      }
    )
    //   }
    // })

    this.mainService.notification.subscribe(
      (data: any) => {
        if (data.type == "message-booking" && this.bookingId == data.bookingId) {

          if (data.conversation) {
            this.conversation = data.conversation
            this.messages = this.conversation.messages
            this.formatData()

          } else {
            if (this.conversation._id == data.conversationId) {

              const message = this.messages.filter(m => m._id == data.newMessage._id)
              if (message.length == 0) this.messages.push(data.newMessage);
            }
          }
          setTimeout(() => {
            this.scrollToBottom()
          }, 400)
        }
      }
    )
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight + 600;
    } catch (err) { }
  }

  send() {
    const notificationData = {
      receiver: this.tourist,
      mainReceiver: this.tourist,
      page: this.pageId,
      booking: this.bookingId,
      sender: this.mainService.user._id,
      isMessage: true,
      subject: this.bookingId,
      message: 'Admin sent you a message',
      type: "booking-tourist",
    }
    if (this.message) {
      if (!this.conversation) {
        const data = { notificationData: notificationData, booking: this.bookingId, page: this.pageId, message: this.message, receiver: this.mainService.user._id }
        this.mainService.createConversation(data).subscribe(
          (response: any) => {
            if (!response.noConversation) {
              this.conversation = response
              this.messages = this.conversation.messages
              this.formatData();
              this.scrollToBottom()
              this.mainService.notify({ user: this.mainService.user, bookingId: this.bookingId, conversation: this.conversation, type: "message-booking", receiver: [this.tourist], message: `You have new message` })
            }
          }
        )
      } else {
        const data = { notificationData: notificationData, conversationId: this.conversation._id, message: this.message }
        const message = { createdAt: "Sending...", sender: this.mainService.user._id, noSender: true, message: this.message }
        this.messages.push(message)
        setTimeout(() => {
          this.scrollToBottom()
        }, 200)
        this.mainService.sendMessage(data).subscribe(
          (response: conversation) => {
            this.conversation = response
            this.messages = this.conversation.messages
            this.formatData()
            this.scrollToBottom()
            this.mainService.notify({ user: this.mainService.user, bookingId: this.bookingId, conversationId: this.conversation._id, newMessage: this.messages[this.messages.length - 1], type: "message-booking", receiver: [this.tourist], message: `You have new message` })
          }
        )
      }
      this.message = ""
    }
  }

  formatData() {
    for (let i = 0; i < this.messages.length; ++i) {
      if (i != 0 && this.messages[i - 1].sender == this.messages[i].sender) {
        this.messages[i]["noSender"] = true
      }
    }
  }
}

