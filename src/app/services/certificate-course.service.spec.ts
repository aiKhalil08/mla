import { TestBed } from '@angular/core/testing';

import { CertificateCourseService } from './certificate-course.service';

describe('CertificateCourseService', () => {
  let service: CertificateCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
