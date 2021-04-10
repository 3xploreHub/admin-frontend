
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // public userIDToken = "";private helper: JwtHelperService,
  private apiUrl = `${environment.apiUrl}/admin`;
  public currentPath: string;
  public bookingId: string;

  constructor(private http: HttpClient) {
  }
  login(credentials) {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    const token = localStorage.getItem('token');
    if (token) {
      // atob function will return an array of spliting the jwt based on a dot...array that contains three items, the second array will develop
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }
  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }else{
      return false;
    }
  }


  getAllBookings(bookingStatus){
    return this.http.get(`${this.apiUrl}/getAllBookings/${bookingStatus}`);
  }
  // getOnProcessBooking(bookingId){
  //   return this.http.get(`${this.apiUrl}/getOnProcessBooking/${bookingId}`);
  // }
  // getBookedDetails(bookingId){
  //   return this.http.get(`${this.apiUrl}/getBookedDetails/${bookingId}`);
  // }
  // getDeclineBookings(bookingId){
  //   return this.http.get(`${this.apiUrl}/getDeclineBookings/${bookingId}`);
  // }
  // getPendingBookings(bookingId){
  //   return this.http.get(`${this.apiUrl}/getPendingBookings/${bookingId}`);
  // }
  getAllPendingNotifications(pageStatus){
    return this.http.get(`${this.apiUrl}/getAllPendingNotifications/${pageStatus}`)
  }
  // getProcessPage(pageId){
  //   return this.http.get(`${this.apiUrl}/getProcessPage/${pageId}`)
  // }
  // getOnlinePage(pageId){
  //   return this.http.get(`${this.apiUrl}/getOnlinePage/${pageId}`)
  // }

  setPageStatus(data) {
    return this.http.post(`${this.apiUrl}/setPageStatus`, data)
  }
  setBookingStatus(data){
    return this.http.post(`${this.apiUrl}/setBookingStatus`,data)
  }

}

