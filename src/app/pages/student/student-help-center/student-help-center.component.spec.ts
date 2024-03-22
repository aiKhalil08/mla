import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHelpCenterComponent } from './student-help-center.component';

describe('StudentHelpCenterComponent', () => {
  let component: StudentHelpCenterComponent;
  let fixture: ComponentFixture<StudentHelpCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentHelpCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
