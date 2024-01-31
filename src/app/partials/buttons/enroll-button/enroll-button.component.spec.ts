import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollButtonComponent } from './enroll-button.component';

describe('EnrollButtonComponent', () => {
  let component: EnrollButtonComponent;
  let fixture: ComponentFixture<EnrollButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EnrollButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
