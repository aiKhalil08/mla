import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { AddMultipleChoiceQuestionComponent } from 'src/app/partials/quiz/admin/add-multiple-choice-question/add-multiple-choice-question.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-edit-question',
    standalone: true,
    templateUrl: './edit-question.component.html',
    styleUrl: './edit-question.component.css',
    imports: [CommonModule, EmptyContentComponent, ReportBarComponent, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, AddMultipleChoiceQuestionComponent]
})
export class EditQuestionComponent implements OnInit {

  question_id: string;
  quiz_title: string;
  fetching: boolean;

  question: Question;

  error: string = null;
  edited: boolean = false;
  question_type_control: FormControl<string>;
  question_points_control: FormControl<string>;
  question_type: string;
  question_points: string;

  question_types: string[] = ['multiple choice', 'true or false'];

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.quiz_title = param['t'];
      this.question_id = atob(param['q']);

      this.fetchQuestion();
    }); 
  }

  fetchQuestion() {
    this.fetching = true;

    this.quizService.getQuestion(this.quiz_title, this.question_id).subscribe({
      next: (response) => {
        // console.log(response)
        this.fetching = false;
        if (response.status == 'failed') {
          this.error = response.message;
          return;
        }
        this.handleFetchQuestionResponse(response);
    }
  });
  }

  handleFetchQuestionResponse(response: {
    status: string;
    message?: string;
    question?: Question;
  }) {
    this.question = response.question;
    this.error = null;

    this.question_type = this.question.type.name.replaceAll('_', ' ');
    this.question_points = String(this.question.points);

    this.question_type_control = new FormControl(this.question_type);
    this.question_type_control.valueChanges.subscribe((type: string) => {console.log('question type changed '+type) ;this.question_type = type});

    console.log('questino fetched and points is '+this.question.points)

    this.question_points_control = new FormControl(this.question_points);
    this.question_points_control.valueChanges.subscribe((points: string) => this.question_points = points);
  }
}
