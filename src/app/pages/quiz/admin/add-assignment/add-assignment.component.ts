import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import BaseResponse from 'src/app/interfaces/base-response';
import { QuizItem } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ConfirmProceedModalComponent } from "../../../../partials/confirm-proceed-modal/confirm-proceed-modal.component";
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
    selector: 'app-add-assignment',
    standalone: true,
    templateUrl: './add-assignment.component.html',
    styleUrl: './add-assignment.component.css',
    imports: [CommonModule, ReportBarComponent, ReactiveFormsModule, MatSlideToggleModule, RedirectButtonComponent, TooltipComponent, CKEditorModule, ConfirmProceedModalComponent]
})
export class AddAssignmentComponent implements OnInit {

  assignment_group!: FormGroup;
  unit_folded: boolean = true;
  submitted: boolean = false;
  created: boolean = false;

  search_control: FormControl;
  search_param: string;
  
  formError: string;
  quizzes_fetched: boolean = false;
  fetching_quizzes: boolean = false;
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

  confirm_submit_text = 'Note that further modifications of the underlying quiz will not relect in this assignment. Ensure that the present state of the quiz is exactly how you want it for this assignment. Do you wish to proceed?'

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private assignmentService: AssignmentService) {}

  ngOnInit() {
    this.assignment_group = this.formBuilder.group({
      name: ['', Validators.required],
      quiz_title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      shuffle: this.formBuilder.group({
        questions: [false],
        options: [false]
      }),
    });

    this.search_control = this.formBuilder.control('');

    this.search_control.valueChanges.pipe(debounceTime(100)).subscribe((value)=>{
      if (value == '') this.quiz_title.setValue('');
      this.search_param = value;
    });
    this.quiz_title.valueChanges.subscribe((value)=>console.log(value));

    this.fetchQuizzes();

  }

  fetchQuizzes() {
    this.fetching_quizzes = true;
    // setTimeout(() => {
      
      this.quizService.getAll().subscribe({
        next: (response) => {
          this.fetching_quizzes = false;
          this.quizzes_fetched = true;

          this.quizzes = response.quizzes;

          console.log(response)
        }
      });
    // }, 6000);
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


  check_match(quiz: QuizItem) {
    if ((String(quiz.title).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
    else return false;
  }

  confirmSubmit() {
    this.show_confirm_submit_modal = true;
    return false;
  }

  cancelSubmit() {
    this.show_confirm_submit_modal = false;
  }

  proceedSubmit() {
    this.form.nativeElement.dispatchEvent(new Event('submit'));
    this.show_confirm_submit_modal = false;
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

    this.assignmentService.add(formData).subscribe({
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
    this.created = true;
  }
}
