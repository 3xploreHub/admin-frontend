import { DeclinedComponent } from './declined/declined.component';
import { BookedComponent } from './booked/booked.component';
import { PendingComponent } from './pending/pending.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: '',component:LoginComponent },
  { path: 'login',component:LoginComponent }, 
  { path: 'notif',component:NotificationComponent,
    children:[
      {path:'',component:NewNotificationComponent},
      {path:"new",component:NewNotificationComponent},
      {path:"pending",component:PendingComponent},
      {path:"booked",component:BookedComponent},
      {path:"declined",component:DeclinedComponent},
    ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
