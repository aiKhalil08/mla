import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCartComponent } from './student-cart.component';

describe('StudentCartComponent', () => {
  let component: StudentCartComponent;
  let fixture: ComponentFixture<StudentCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
