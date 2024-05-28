import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userNotExternalGuard } from './user-not-external.guard';

describe('userNotExternalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNotExternalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
