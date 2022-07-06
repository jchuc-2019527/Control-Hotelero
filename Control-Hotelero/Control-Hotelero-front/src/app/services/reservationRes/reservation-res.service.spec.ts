import { TestBed } from '@angular/core/testing';

import { ReservationResService } from './reservation-res.service';

describe('ReservationResService', () => {
  let service: ReservationResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
