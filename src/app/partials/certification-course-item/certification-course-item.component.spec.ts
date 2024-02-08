import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCourseItemComponent } from './certification-course-item.component';

describe('CertificationCourseItemComponent', () => {
  let component: CertificationCourseItemComponent;
  let fixture: ComponentFixture<CertificationCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificationCourseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
