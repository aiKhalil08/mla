import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userCanTakeQuizGuard } from './user-can-take-quiz.guard';

describe('userCanTakeQuizGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userCanTakeQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
