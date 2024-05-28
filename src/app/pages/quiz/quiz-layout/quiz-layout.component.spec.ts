import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLayoutComponent } from './quiz-layout.component';

describe('QuizLayoutComponent', () => {
  let component: QuizLayoutComponent;
  let fixture: ComponentFixture<QuizLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
