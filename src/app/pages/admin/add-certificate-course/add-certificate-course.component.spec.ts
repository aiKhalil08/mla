import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateCourseComponent } from './add-certificate-course.component';

describe('AddCertificateCourseComponent', () => {
  let component: AddCertificateCourseComponent;
  let fixture: ComponentFixture<AddCertificateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddCertificateCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertificateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
