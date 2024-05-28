import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleChoiceQuestionComponent } from './add-multiple-choice-question.component';

describe('AddMultipleChoiceQuestionComponent', () => {
  let component: AddMultipleChoiceQuestionComponent;
  let fixture: ComponentFixture<AddMultipleChoiceQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMultipleChoiceQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMultipleChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
