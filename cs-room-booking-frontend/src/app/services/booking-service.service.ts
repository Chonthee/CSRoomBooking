import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/iresponse';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) { }

  private sever_ip = 'localhost:3000';
  private no_timeout = 5000;
  
  // Get available hour
  getFromDate(date: string): Observable<IResponse> {
    console.log(`${this.sever_ip}/api/booking?date=${date}`);
    return this.http.get<IResponse>(`http://${this.sever_ip}/api/booking?date=${date}`).pipe(timeout(this.no_timeout));
  }

  // Booking a specific time 
  bookFromDate(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(`http://${this.sever_ip}/api/booking`,data).pipe(timeout(this.no_timeout));
  }
}
