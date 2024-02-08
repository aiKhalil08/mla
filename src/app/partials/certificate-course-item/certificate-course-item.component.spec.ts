import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCourseItemComponent } from './certificate-course-item.component';

describe('CertificateCourseItemComponent', () => {
  let component: CertificateCourseItemComponent;
  let fixture: ComponentFixture<CertificateCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CertificateCourseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
