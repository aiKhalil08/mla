import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { studentEmailVerifiedGuard } from './student-email-verified.guard';

describe('studentEmailVerifiedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => studentEmailVerifiedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
