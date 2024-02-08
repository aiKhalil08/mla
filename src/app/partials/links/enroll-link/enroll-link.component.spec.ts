import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollLinkComponent } from './enroll-link.component';

describe('EnrollLinkComponent', () => {
  let component: EnrollLinkComponent;
  let fixture: ComponentFixture<EnrollLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EnrollLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
