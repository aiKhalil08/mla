import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffshoreCourseItemComponent } from './offshore-course-item.component';

describe('OffshoreCourseItemComponent', () => {
  let component: OffshoreCourseItemComponent;
  let fixture: ComponentFixture<OffshoreCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OffshoreCourseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffshoreCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
