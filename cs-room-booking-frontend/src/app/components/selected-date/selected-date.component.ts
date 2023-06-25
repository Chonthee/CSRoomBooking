import { Component, Input, } from '@angular/core';
import { BookingServiceService } from '../../services/booking-service.service'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-selected-date',
  templateUrl: './selected-date.component.html',
  styleUrls: ['./selected-date.component.css']
})
export class SelectedDateComponent {

  @Input() date: string = '';

  data = [
    { time: '09:00 to 10:00', status: '' },
    { time: '10:00 to 11:00', status: '' },
    { time: '12:00 to 13:00', status: '' },
    { time: '13:00 to 14:00', status: '' },
    { time: '14:00 to 15:00', status: '' },
    { time: '15:00 to 16:00', status: '' },
    { time: '16:00 to 17:00', status: '' },
    { time: '17:00 to 18:00', status: '' },
  ];

  current_data: any = [];

  constructor(
    private bookingServiceService: BookingServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log('input date', this.date);
    this.getDate(this.date);
  }

  async getDate(date: string) {
    const result = await this.bookingServiceService.getFromDate(date).subscribe((response: any) => {
      if (response.success === true) {
        console.log('receive data', response.data);
        this.current_data = response.data;
        console.log('current data', this.current_data)
        this.updateDate(this.current_data)
        return response.data;
      } else {
        console.log('failed')
        return false
      }
    });
  }

  async updateDate(_data: any) {
    for (let i = 0; i < _data.length; i++) {
      this.data[i].status = _data[i] ? 'AVAILABLE' : 'BOOKED';
    }
    console.log(this.data)
  }

  async onBooking(index: number) {
    console.log('You select', this.data[index].time);
    const data = {
      date: this.date,
      times: index,
      name: "Test"
    }

    this.bookingServiceService.bookFromDate(data).subscribe((data:any) => {
      console.log('create data', data)
      if (data.success) {
        this.getDate(this.date);
      }
    })

  }
}
