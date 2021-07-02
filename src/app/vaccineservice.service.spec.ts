import { TestBed } from '@angular/core/testing';

import { VaccineserviceService } from './vaccineservice.service';

describe('VaccineserviceService', () => {
  let service: VaccineserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
