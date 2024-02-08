import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffshoreCourseComponent } from './add-offshore-course.component';

describe('AddOffshoreCourseComponent', () => {
  let component: AddOffshoreCourseComponent;
  let fixture: ComponentFixture<AddOffshoreCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddOffshoreCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOffshoreCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
