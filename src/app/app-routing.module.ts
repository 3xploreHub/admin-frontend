import { PendingPagesNotificationComponent } from './pending-pages-notification/pending-pages-notification.component';
import { OnlinePagesNotificationComponent } from './online-pages-notification/online-pages-notification.component';
import { AllNotifComponent } from './all-notif/all-notif.component';
import { DeclinedComponent } from './declined/declined.component';
import { BookedComponent } from './booked/booked.component';
import { PendingComponent } from './pending/pending.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { AuthGuard } from './auth/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { DetailsComponent } from './details/details.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'notif', component: NotificationComponent,
    children: [
      // { path: 'allNotif', component: AllNotifComponent, data: { isHidden: true } },
      
      { path: '', component: NewNotificationComponent },
      { path: 'new', component: NewNotificationComponent },
      { path: 'pending', component: PendingComponent },
      { path: 'booked', component: BookedComponent },
      { path: 'declined', component: DeclinedComponent },
    ], canActivate: [AuthGuard],
  },
  {
    path: 'pagesToApprove', component: AllNotifComponent,
    children: [
      { path: '', component: PendingPagesNotificationComponent },
      { path: 'pendingPages', component: PendingPagesNotificationComponent },
      { path: 'onlinePages', component: OnlinePagesNotificationComponent },
    ], canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
