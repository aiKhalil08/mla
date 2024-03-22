import { TestBed } from '@angular/core/testing';

import { XSRFService } from './xsrf.service';

describe('XSRFService', () => {
  let service: XSRFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XSRFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
