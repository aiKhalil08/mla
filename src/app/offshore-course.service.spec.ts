import { TestBed } from '@angular/core/testing';

import { OffshoreCourseService } from './offshore-course.service';

describe('OffshoreCourseService', () => {
  let service: OffshoreCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffshoreCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
