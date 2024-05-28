import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userIsStudentGuard } from './user-is-student.guard';

describe('userIsStudentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userIsStudentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
