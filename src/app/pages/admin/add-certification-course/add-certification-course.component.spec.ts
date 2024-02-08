import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificationCourseComponent } from './add-certification-course.component';

describe('AddCertificationCourseComponent', () => {
  let component: AddCertificationCourseComponent;
  let fixture: ComponentFixture<AddCertificationCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddCertificationCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertificationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
