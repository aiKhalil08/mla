import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAssignmentComponent } from './review-assignment.component';

describe('ReviewAssignmentComponent', () => {
  let component: ReviewAssignmentComponent;
  let fixture: ComponentFixture<ReviewAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
