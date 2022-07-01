import { TestBed } from '@angular/core/testing';

import { AdminHotelRestService } from './admin-hotel-rest.service';

describe('AdminHotelRestService', () => {
  let service: AdminHotelRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHotelRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
