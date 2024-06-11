import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulateAssignmentComponent } from './populate-assignment.component';

describe('PopulateAssignmentComponent', () => {
  let component: PopulateAssignmentComponent;
  let fixture: ComponentFixture<PopulateAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulateAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopulateAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
