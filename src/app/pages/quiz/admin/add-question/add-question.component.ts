import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Quiz } from 'src/app/interfaces/quiz';
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddMultipleChoiceQuestionComponent } from "../../../../partials/quiz/admin/add-multiple-choice-question/add-multiple-choice-question.component";

@Component({
    selector: 'app-add-question',
    standalone: true,
    templateUrl: './add-question.component.html',
    styleUrl: './add-question.component.css',
    imports: [CommonModule, ReportBarComponent, CKEditorModule, EmptyContentComponent, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, AddMultipleChoiceQuestionComponent]
})
export class AddQuestionComponent implements OnInit {

  quiz_title: string;
  fetching: boolean;
  quiz: Quiz;
  question_type_control: FormControl<string>;
  question_points_control: FormControl<string>;
  question_type: string;
  question_points: string = '1';
  added: boolean;
  error: string = null;
  question_types: string[] = ['multiple choice', 'true or false'];

  editor: ClassicEditor;

  constructor (private route: ActivatedRoute, private quizService: QuizService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.quiz_title = params['t'];
      
    });


    this.fetchQuiz();
  }

  fetchQuiz() {
    this.fetching = true;
    this.quizService.get(this.quiz_title).subscribe({
      next: (response) => {
          // check if quiz exits
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.quiz = response.quiz;
          this.error = null;
          this.question_type_control = new FormControl('');
          this.question_type_control.valueChanges.subscribe((type: string) => this.question_type = type);

          this.question_points_control = new FormControl('1');
          this.question_points_control.valueChanges.subscribe((points: string) => this.question_points = points);
      }
    });
  }
}
