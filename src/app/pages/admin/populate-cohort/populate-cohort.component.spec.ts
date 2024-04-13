import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulateCohortComponent } from './populate-cohort.component';

describe('PopulateCohortComponent', () => {
  let component: PopulateCohortComponent;
  let fixture: ComponentFixture<PopulateCohortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulateCohortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopulateCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
