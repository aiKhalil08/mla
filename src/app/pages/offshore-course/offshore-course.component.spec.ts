import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffshoreCourseComponent } from './offshore-course.component';

describe('OffshoreCourseComponent', () => {
  let component: OffshoreCourseComponent;
  let fixture: ComponentFixture<OffshoreCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OffshoreCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffshoreCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
