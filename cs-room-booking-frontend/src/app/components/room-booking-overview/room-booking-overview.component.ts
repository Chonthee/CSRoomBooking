import { Component, ViewChild } from '@angular/core';
import { BookingSocketService } from 'src/app/services/booking-socket.service';
import { Subscription } from 'rxjs';


import { SelectedDateComponent } from '../selected-date/selected-date.component';

@Component({
  selector: 'app-room-booking-overview',
  templateUrl: './room-booking-overview.component.html',
  styleUrls: ['./room-booking-overview.component.css']
})
export class RoomBookingOverviewComponent {
  @ViewChild(SelectedDateComponent, { static: false }) selectedDateComponent!: SelectedDateComponent

  freeHour: number[] = Array(9).fill(0);
  date: string[] = Array(9).fill('-');
  private messageSubscription: Subscription;
  receiveMessage: any;
  showSelectedDate: boolean = false;
  selectedDate: string = '';

  constructor(
    private bookingSocketService: BookingSocketService,
  ) {
    this.messageSubscription = this.bookingSocketService
      .onMessage()
      .subscribe((message: string) => {
        this.receiveMessage = JSON.parse(message);
      });
  }

  ngOnInit() {
    console.log(this.freeHour);
  }

  onSelectDate(index: number) {
    this.showSelectedDate = true;
    this.selectedDate = this.receiveMessage[index].date;
    console.log('Select Data ', index);
    console.log('Select Date ', this.receiveMessage[index].date);

    this.selectedDateComponent.getDate(this.selectedDate);


  }


}
