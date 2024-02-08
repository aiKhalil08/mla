import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCourseListComponent } from './certification-course-list.component';

describe('CertificationCourseListComponent', () => {
  let component: CertificationCourseListComponent;
  let fixture: ComponentFixture<CertificationCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificationCourseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
