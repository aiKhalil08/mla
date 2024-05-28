import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchedCourseComponent } from './patched-course.component';

describe('PatchedCourseComponent', () => {
  let component: PatchedCourseComponent;
  let fixture: ComponentFixture<PatchedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatchedCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatchedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
