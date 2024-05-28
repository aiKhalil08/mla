import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userIsExternalUserGuard } from './user-is-external-user.guard';

describe('userIsExternalUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userIsExternalUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
