import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCertificationCourseComponent } from './action-certification-course.component';

describe('ActionCertificationCourseComponent', () => {
  let component: ActionCertificationCourseComponent;
  let fixture: ComponentFixture<ActionCertificationCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionCertificationCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCertificationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
