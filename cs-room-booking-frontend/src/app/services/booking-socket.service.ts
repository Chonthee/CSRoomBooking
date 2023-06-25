import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class BookingSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('overviewBook', (message: string) => {
        observer.next(message);
      });
    });
  }
}
