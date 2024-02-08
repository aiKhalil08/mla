import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCourseComponent } from './certification-course.component';

describe('CertificationCourseComponent', () => {
  let component: CertificationCourseComponent;
  let fixture: ComponentFixture<CertificationCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificationCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
