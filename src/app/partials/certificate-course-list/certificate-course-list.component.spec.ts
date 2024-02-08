import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCourseListComponent } from './certificate-course-list.component';

describe('CertificateCourseListComponent', () => {
  let component: CertificateCourseListComponent;
  let fixture: ComponentFixture<CertificateCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificateCourseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
