import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOffshoreCourseComponent } from './action-offshore-course.component';

describe('ActionOffshoreCourseComponent', () => {
  let component: ActionOffshoreCourseComponent;
  let fixture: ComponentFixture<ActionOffshoreCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionOffshoreCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionOffshoreCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
