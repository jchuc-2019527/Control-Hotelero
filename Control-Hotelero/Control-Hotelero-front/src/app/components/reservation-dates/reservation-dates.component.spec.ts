import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDatesComponent } from './reservation-dates.component';

describe('ReservationDatesComponent', () => {
  let component: ReservationDatesComponent;
  let fixture: ComponentFixture<ReservationDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
