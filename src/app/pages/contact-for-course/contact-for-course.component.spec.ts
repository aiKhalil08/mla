import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactForCourseComponent } from './contact-for-course.component';

describe('ContactForCourseComponent', () => {
  let component: ContactForCourseComponent;
  let fixture: ComponentFixture<ContactForCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactForCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
