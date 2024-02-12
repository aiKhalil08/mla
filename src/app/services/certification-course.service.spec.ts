import { TestBed } from '@angular/core/testing';

import { CertificationCourseService } from './certification-course.service';

describe('CertificationCourseService', () => {
  let service: CertificationCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificationCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
