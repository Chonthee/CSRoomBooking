import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomBookingOverviewComponent } from './components/room-booking-overview/room-booking-overview.component';
import { SelectedDateComponent } from './components/selected-date/selected-date.component';
import { DateDetailComponent } from './components/shared/date-detail/date-detail.component';
import { AlertsComponent } from './components/shared/alerts/alerts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RoomBookingOverviewComponent,
    SelectedDateComponent,
    DateDetailComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
