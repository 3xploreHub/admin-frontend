import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  private apiUrl = `${environment.apiUrl}/admin`;
  pusher: any;
  messagesChannel: any;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher('925632214c543de24e27', {
      cluster: 'ap1',
      authEndpoint: `${this.apiUrl}/auth`,
    });
    this.messagesChannel = this.pusher.subscribe('my-channel');
  }

  // pusher(){
  //   return
  // }
}
