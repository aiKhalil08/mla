import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseResponse from 'src/app/interfaces/base-response';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
    selector: 'app-edit-quiz',
    standalone: true,
    templateUrl: './edit-quiz.component.html',
    styleUrl: './edit-quiz.component.css',
    imports: [CommonModule, ReportBarComponent, EmptyContentComponent, RedirectButtonComponent, ReactiveFormsModule, CKEditorModule]
})
export class EditQuizComponent implements OnInit {

  quiz_title: string;

  fetching: boolean;
  error: string = null;

  quiz: Quiz;

  editable: boolean = false;

  quizGroup: FormGroup;
  pictureSelected: boolean = false;
  edited: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  editor = ClassicEditor;
  
  constructor(private quizService: QuizService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.quiz_title = params['t'];
      
    });
    this.fetch_quiz();
  }

  fetch_quiz() {
    this.fetching = true;
    this.quizService.get(this.quiz_title).subscribe({
      next: (response) => {
          // console.log(response)
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.handleFetchQuizResponse(response);
      }
    });
  }

  handleFetchQuizResponse(response: {
    status: string;
    message?: string;
    quiz?: Quiz;
  }) {
    this.quiz = response.quiz;
    this.error = null;

    this.quizGroup = this.formBuilder.group({
      title: [this.quiz.title, Validators.required],
      description: [this.quiz.description, Validators.required],
    });
  }


  get form_invalid() {
    
    return this.quizGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  get description() {
    return this.quizGroup.get('description');
  }

  get title() {
    return this.quizGroup.get('title');
  }

  get location() {
    return `/quiz/admin/quiz/${this.quiz_title}`;
  }

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.quizGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);

    formData.append('description', this.description.value);


    this.quizService.edit(formData, this.quiz_title).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.handleResponse(response);
      }
    });
  }

  handleResponse(response: BaseResponse) {
    this.formError = null;
    this.edited = true;
  }
}
