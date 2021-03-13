import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

export interface NewNotification{
  id:number;
  img:String;
  ownersName:String;
  location:String;
  dateRecieve: String;
  touristSpotName:String
}
@Component({
  selector: 'app-all-notif',
  templateUrl: './all-notif.component.html',
  styleUrls: ['./all-notif.component.css']
})


export class AllNotifComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }

  

}
