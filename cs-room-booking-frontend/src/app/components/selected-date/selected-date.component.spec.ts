import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDateComponent } from './selected-date.component';

describe('SelectedDateComponent', () => {
  let component: SelectedDateComponent;
  let fixture: ComponentFixture<SelectedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
