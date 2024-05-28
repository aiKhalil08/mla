import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { RedirectButtonComponent } from 'src/app/partials/buttons/redirect-button/redirect-button.component';
import { ReportBarComponent } from 'src/app/partials/report-bar/report-bar.component';
import { QuizService } from 'src/app/services/quiz.service';
import BaseResponse from 'src/app/interfaces/base-response';

@Component({
    selector: 'app-add-blog',
    standalone: true,
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, CKEditorModule, ReportBarComponent, TooltipComponent],
})
export class CreateQuizComponent implements OnInit {
  quizGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  editor = ClassicEditor;
  
  constructor(private quizService: QuizService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
   
    this.quizGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
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

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.quizGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);

    formData.append('description', this.description.value);


    this.quizService.create(formData).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.handleResponse(response);
      },
    });
  }

  handleResponse(response: BaseResponse) {
    this.formError = null;
    this.created = true;
  }
}
