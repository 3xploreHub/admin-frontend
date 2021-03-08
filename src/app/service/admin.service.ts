
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // public userIDToken = "";private helper: JwtHelperService,
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {
  }


  login(credentials) {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  setToken(token: string) {
    localStorage.setItem('token', token)
  }
  deleteToken() {
    localStorage.removeItem('token')
  }
  getUserPayload() {
    var token = localStorage.getItem('token')
    if (token) {
      //atob function will return an array of spliting the jwt based on a dot...array that contains three items, the second array will develop
      var userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload)
    } else {
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }else{
      return false
    }
  }
}
