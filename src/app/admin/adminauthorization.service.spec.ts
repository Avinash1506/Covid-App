import { TestBed } from '@angular/core/testing';

import { AdminauthorizationService } from './adminauthorization.service';

describe('AdminauthorizationService', () => {
  let service: AdminauthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminauthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
