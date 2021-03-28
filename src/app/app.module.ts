
import { AdminService } from './service/admin.service';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PusherService } from './pusher.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { FilterPipe } from './pipes/filter.pipe';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';


import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { DetailsComponent } from './details/details.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { PendingComponent } from './pending/pending.component';
import { BookedComponent } from './booked/booked.component';
import { DeclinedComponent } from './declined/declined.component';
import { PendingDetailsComponent } from './pending-details/pending-details.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { AllNotifComponent } from './all-notif/all-notif.component';
import { BookedDetailsComponent } from './booked-details/booked-details.component';
import { DeclinedDetailsComponent } from './declined-details/declined-details.component';



export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationComponent,
    DetailsComponent,
    NewNotificationComponent,
    PendingComponent,
    BookedComponent,
    DeclinedComponent,
    PendingDetailsComponent,
    MatDialogComponent,
    AllNotifComponent,
    BookedDetailsComponent,
    DeclinedDetailsComponent,
    // FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    // Pusher
  ],
  providers: [
    AdminService,
    AuthGuard,
    PusherService
  ],
  bootstrap: [AppComponent],
  entryComponents:[MatDialogComponent]
})
export class AppModule { }
