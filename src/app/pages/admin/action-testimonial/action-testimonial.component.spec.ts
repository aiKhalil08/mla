import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTestimonialComponent } from './action-testimonial.component';

describe('ActionTestimonialComponent', () => {
  let component: ActionTestimonialComponent;
  let fixture: ComponentFixture<ActionTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionTestimonialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
