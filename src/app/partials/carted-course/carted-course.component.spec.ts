import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartedCourseComponent } from './carted-course.component';

describe('CartedCourseComponent', () => {
  let component: CartedCourseComponent;
  let fixture: ComponentFixture<CartedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartedCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
