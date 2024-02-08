import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCourseComponent } from './certificate-course.component';

describe('CertificateCourseComponent', () => {
  let component: CertificateCourseComponent;
  let fixture: ComponentFixture<CertificateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificateCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
