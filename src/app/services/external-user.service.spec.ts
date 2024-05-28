import { TestBed } from '@angular/core/testing';

import { ExternalUserService } from './external-user.service';

describe('ExternalUserService', () => {
  let service: ExternalUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
