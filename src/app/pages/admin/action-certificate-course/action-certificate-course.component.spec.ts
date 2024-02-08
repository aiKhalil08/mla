import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCertificateCourseComponent } from './action-certificate-course.component';

describe('ActionCertificateCourseComponent', () => {
  let component: ActionCertificateCourseComponent;
  let fixture: ComponentFixture<ActionCertificateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionCertificateCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCertificateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
