import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificateCourseService } from 'src/app/services/certificate-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PostResponse from 'src/app/interfaces/base-response';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-action-blog',
    standalone: true,
    templateUrl: './action-blog.component.html',
    styleUrls: ['./action-blog.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent, CKEditorModule, ReportBarComponent, TooltipComponent, EmptyContentComponent]
})
export class ActionBlogComponent implements OnInit {
  blog!: Blog;
  // course_code!: string;
  blogGroup!: FormGroup;
  pictureSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  no_blog: string = null;
  formError: string = null;
  deleting: boolean = false;
  error_in_deleting: string = null;
  tried_to_submit: boolean = false;

  fetching: boolean = false;


  editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let heading;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {heading = param.get('heading')});
    
    this.fetch_blog(heading);
  }

  fetch_blog(heading: string) {
    this.fetching = true;
    this.blogService.get(heading).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.no_blog = response.message;
          return;
        }
        this.blog = response.blog;
        this.blogGroup = this.formBuilder.group({
          heading: [this.blog.heading, Validators.required],
          content: [this.blog.content, Validators.required],
          image: [null],
        });
        if (this.blog.image_url) {
          this.pictureSelected = true;
          setTimeout(()=>{
            (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.blog.image_url;
          }, 0);
        }
      },
    });
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    console.log('in handle')
    if (this.editable) {
      let file = (<HTMLInputElement>event.target).files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        img.src = <string>reader.result;
        this.pictureSelected = true;
      };
      if (file) reader.readAsDataURL(file);
    }
  }


  get content() {
    return this.blogGroup.get('content');
  }

  get heading() {
    return this.blogGroup.get('heading');
  }

  get form_invalid() {
    
    return this.blogGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }


  deleteBlog(course_code: string) {
    this.deleting = true;
    this.blogService.delete(course_code).subscribe({
      next: (response) => {
        this.deleting = false;
        if (response.status == 'success') {
          this.error_in_deleting = null;
          this.navigator.navigate(['/admin/resources']);
        } else this.error_in_deleting = response.message;
      },
    });
  }

  onSubmit(form: HTMLFormElement) {
    this.tried_to_submit = true;
    
    if (this.blogGroup.invalid) return;

      this.submitted = true;
      let formData = new FormData(form);

      formData.append('content', this.content.value);

      this.blogService.edit(formData, this.blog.heading).subscribe({
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
    this.edited = true;
  }
}
