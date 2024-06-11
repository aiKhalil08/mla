import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { debounceTime } from 'rxjs';
import { Assignment } from 'src/app/interfaces/assignment';
import BaseResponse from 'src/app/interfaces/base-response';
import { QuizItem } from 'src/app/interfaces/quiz';
import { AssignmentService } from 'src/app/services/assignment.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';

@Component({
    selector: 'app-edit-assignment',
    standalone: true,
    templateUrl: './edit-assignment.component.html',
    styleUrl: './edit-assignment.component.css',
    imports: [CommonModule, ReportBarComponent, ReactiveFormsModule, EmptyContentComponent, RedirectButtonComponent, CKEditorModule, MatSlideToggle, TooltipComponent]
})
export class EditAssignmentComponent implements OnInit {

  assignment_name: string;
  assignment: Assignment;

  editable: boolean = false;

  assignment_group!: FormGroup;
  unit_folded: boolean = true;
  submitted: boolean = false;
  edited: boolean = false;

  fetching: boolean;
  error: string = null;

  search_control: FormControl;
  search_param: string;
  
  formError: string;
  show_quizzes_list: boolean = false;
  errors: object = {
    name: null,
    quiz_title: null,
    duration: null,
  }
  errrorsRectified: number;
  errorneousFields: string[] = [];
  backWithErrors: boolean;
  tried_to_submit: boolean = false;
  quizzes: QuizItem[];
  show_confirm_submit_modal: boolean;

  editor = ClassicEditor;

  @ViewChild('form', {static: false}) form: ElementRef;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private assignmentService: AssignmentService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.assignment_name = params['n'];
      
    });
    this.fetchAssignment();

  }

  fetchAssignment() {
    // this.fetching = true;
    this.assignmentService.get(this.assignment_name).subscribe({
      next: (response) => {
          // console.log(response)
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.handleFetchAssignmentResponse(response);
      }
    });
  }

  handleFetchAssignmentResponse(response: {
    status: string;
    message?: string;
    assignment?: Assignment;
  }) {
    this.assignment = response.assignment;
    this.error = null;

    this.assignment_group = this.formBuilder.group({
      name: [this.assignment.name, Validators.required],
      quiz_title: [this.assignment.quiz.title, Validators.required],
      description: [this.assignment.description, Validators.required],
      duration: [this.assignment.duration, Validators.required],
      shuffle: this.formBuilder.group({
        questions: [this.assignment.shuffle.questions == 'true' ? true : false],
        options: [this.assignment.shuffle.options == 'true' ? true : false]
      }),
    });
    this.shuffle_questions.disable()
    this.shuffle_options.disable();
  }

  removeQuizList() {
    setTimeout(() => {
      this.search_param = '';
    }, 101);
  }

  get form_invalid() {
    
    return this.assignment_group.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  
  get name() {
    return <FormControl>this.assignment_group.get('name');
  }

  get quiz_title() {
    return <FormControl>this.assignment_group.get('quiz_title');
  }

  get duration() {
    return <FormControl>this.assignment_group.get('duration');
  }

  get description() {
    return <FormControl>this.assignment_group.get('description');
  }

  get shuffle_questions() {
    return <FormControl>this.assignment_group.get('shuffle').get('questions');
  }

  get shuffle_options() {
    return <FormControl>this.assignment_group.get('shuffle').get('options');
  }

  get location() {
    return `/quiz/admin/assignment/${this.assignment_name}`;
  }


  check_match(quiz: QuizItem) {
    if ((String(quiz.title).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
    else return false;
  }

  onSubmit(form: HTMLFormElement) {

    this.tried_to_submit = true;
    
    if (this.assignment_group.invalid) return;

    console.log('submitted')
    
    this.submitted = true;
    
    let formData = new FormData(form);

    formData.set('description', this.description.value);
    formData.set('quiz_title', this.quiz_title.value);
    formData.set('shuffle[questions]', this.shuffle_questions.value);
    formData.set('shuffle[options]', this.shuffle_options.value);

    this.assignmentService.edit(formData, this.assignment.name).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.handleResponse(response)
      },
    });
    
  }

  handleResponse(response: BaseResponse) {
    this.formError = null;
    this.edited = true;
  }
}
