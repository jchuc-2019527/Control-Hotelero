import { TestBed } from '@angular/core/testing';

import { AdminAppRestService } from './admin-app-rest.service';

describe('AdminAppRestService', () => {
  let service: AdminAppRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAppRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
