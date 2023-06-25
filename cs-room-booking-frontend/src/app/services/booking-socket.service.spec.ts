import { TestBed } from '@angular/core/testing';

import { BookingSocketService } from './booking-socket.service';

describe('BookingSocketService', () => {
  let service: BookingSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
