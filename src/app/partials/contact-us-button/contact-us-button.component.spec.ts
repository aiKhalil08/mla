import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsButtonComponent } from './contact-us-button.component';

describe('ContactUsButtonComponent', () => {
  let component: ContactUsButtonComponent;
  let fixture: ComponentFixture<ContactUsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactUsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
