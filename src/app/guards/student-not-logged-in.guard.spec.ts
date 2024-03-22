import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { studentNotLoggedInGuard } from './student-not-logged-in.guard';

describe('studentNotLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => studentNotLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
