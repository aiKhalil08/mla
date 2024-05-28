import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseResponse from 'src/app/interfaces/base-response';
import { QuizService } from 'src/app/services/quiz.service';
import { RedirectButtonComponent } from "../../../buttons/redirect-button/redirect-button.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { Question } from 'src/app/interfaces/quiz';
import { Observable, merge } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-multiple-choice-question',
    standalone: true,
    templateUrl: './add-multiple-choice-question.component.html',
    styleUrl: './add-multiple-choice-question.component.css',
    imports: [CommonModule, ReactiveFormsModule, CKEditorModule, RedirectButtonComponent, TooltipComponent]
})
export class AddMultipleChoiceQuestionComponent implements OnInit {
  @Input('edit') edit: boolean;
  @Input('question') question?: Question;
  @Input('true_or_false') true_or_false: boolean = false; // an input that is true if the question has true and false options.
  @Input('quiz_title') quiz_title: string;
  @Input('question_points') question_points: string;

  fetching: boolean;
  error: string = null;

  editable: boolean = false;

  question_group: FormGroup;
  // correct_option: FormControl;
  pictureSelected: boolean = false;
  action_done: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  editor = ClassicEditor;
  
  constructor(private quizService: QuizService, private formBuilder: FormBuilder, private navigator: Router) {}

  ngOnInit(): void {

    let correct_option = '';

    if (this.edit) {
      correct_option = String(this.question.options.findIndex(option => option.is_correct));
    }

    console.log(this.question_points)

    this.question_group = this.formBuilder.group({
      text: [this.question ? this.question.text : '', Validators.required],
      options: this.formBuilder.array([]),
      correct_option: [correct_option, Validators.required],
    });

    let options: string[];

    if ((this.edit && this.true_or_false) || this.true_or_false) options = ['True', 'False'];
    else if (this.edit) options = this.question.options.map(option => option.text);
    else options = ['', '', '', ''];


    options.forEach(option => this.options.push(this.formBuilder.control(option, Validators.required)));

    // this.options.valueChanges.subscribe(() => this.correct_option.setValue(''));

  }

  get form_invalid() {

    if (this.options.length < 2) return true;
    if (!this.correct_option.value) return true;
    
    return this.question_group.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  add(control: string) {
    let form_array = <FormArray>this.question_group.get(control+'s');
    form_array.push(this.formBuilder.control('', Validators.required));
    this.correct_option.setValue('')
  }
  
  remove(control: string, index?: number) {
    let form_array = <FormArray>this.question_group.get(control+'s');
    index = index ?? form_array.length - 1;
    form_array.removeAt(index);
    this.correct_option.setValue('')
  }

  get text() {
    return this.question_group.get('text');
  }

  get correct_option() {
    return <FormControl>this.question_group.get('correct_option');
  }

  get options() {
    return <FormArray>this.question_group.get('options');
  }

  get location() {
    return "/quiz/admin/questions?t="+encodeURIComponent(this.quiz_title);
  }

  goBack() {
    this.navigator.navigate(['quiz', 'admin', 'questions'], {queryParams: {t: this.quiz_title}})
  }

  get buttonText() {
    if (this.action_done) {
      return this.edit ? 'Edited' : 'Added';
    } else return this.edit ? 'Edit' : 'Add';
  }

  optionIsCorrect(index: number) {
    if (this.correct_option.value === '') return false;
    return (Number(this.correct_option.value) === index) ? true : false;
  }

  onSubmit(form) {
    // console.log(this.correct_option.value); return;
    this.tried_to_submit = true;
    
    if (this.form_invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    
    formData.append('text', this.text.value);
    formData.set('correct_option', this.correct_option.value);
    formData.set('type', this.true_or_false ? 'true_or_false' : 'multiple_choice');
    formData.set('points', this.question_points);

    let obs: Observable<BaseResponse>;

    if (this.edit) obs = this.quizService.editQuestion(formData, this.quiz_title, this.question.id);
    else obs = this.quizService.addQuestion(formData, this.quiz_title);


    obs.subscribe({
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
    this.action_done = true;
  }
}
