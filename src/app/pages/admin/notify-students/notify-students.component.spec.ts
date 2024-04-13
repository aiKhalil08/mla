import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyStudentsComponent } from './notify-students.component';

describe('NotifyStudentsComponent', () => {
  let component: NotifyStudentsComponent;
  let fixture: ComponentFixture<NotifyStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
