import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { BlogService } from 'src/app/services/blog.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import PostResponse from 'src/app/interfaces/base-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';

@Component({
    selector: 'app-add-blog',
    standalone: true,
    templateUrl: './add-blog.component.html',
    styleUrls: ['./add-blog.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, CKEditorModule, ReportBarComponent, TooltipComponent]
})
export class AddBlogComponent implements OnInit {
  blogGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  editor = ClassicEditor;
  
  constructor(private blogService: BlogService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.blogGroup = this.formBuilder.group({
      heading: ['', Validators.required],
      content: ['', Validators.required],
      image: [null],
    });
  }


  get form_invalid() {
    
    return this.blogGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    let file = (<HTMLInputElement>event.target).files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      img.src = <string>reader.result;
      this.pictureSelected = true;
    };
    if (file) reader.readAsDataURL(file);
  }

  get content() {
    return this.blogGroup.get('content');
  }

  get heading() {
    return this.blogGroup.get('heading');
  }

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.blogGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);

    formData.append('content', this.content.value);


    this.blogService.add(formData).subscribe({
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

  handleResponse(response: PostResponse) {
    this.formError = null;
    this.created = true;
  }
}
