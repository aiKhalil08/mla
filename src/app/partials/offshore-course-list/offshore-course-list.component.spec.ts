import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffshoreCourseListComponent } from './offshore-course-list.component';

describe('OffshoreCourseListComponent', () => {
  let component: OffshoreCourseListComponent;
  let fixture: ComponentFixture<OffshoreCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OffshoreCourseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffshoreCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
