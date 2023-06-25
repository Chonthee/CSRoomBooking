import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookingOverviewComponent } from './room-booking-overview.component';

describe('RoomBookingOverviewComponent', () => {
  let component: RoomBookingOverviewComponent;
  let fixture: ComponentFixture<RoomBookingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomBookingOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomBookingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
