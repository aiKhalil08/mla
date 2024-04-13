import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCohortComponent } from './edit-cohort.component';

describe('EditCohortComponent', () => {
  let component: EditCohortComponent;
  let fixture: ComponentFixture<EditCohortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCohortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
