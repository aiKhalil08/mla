import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminNotLoggedInGuard } from './admin-not-logged-in.guard';

describe('adminNotLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminNotLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
