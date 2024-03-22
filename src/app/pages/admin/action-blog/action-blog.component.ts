import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { fromEvent, map, merge, Observable, filter, debounceTime, distinctUntilChanged } from 'rxjs';
// import { CourseService } from 'src/app/course.service';
import { CertificateCourseService } from 'src/app/services/certificate-course.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
    selector: 'app-action-blog',
    standalone: true,
    templateUrl: './action-blog.component.html',
    styleUrls: ['./action-blog.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent]
})
export class ActionBlogComponent implements OnInit {
  blog!: Blog;
  // course_code!: string;
  blogGroup!: FormGroup;
  pictureSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let heading;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {heading = param.get('heading')});
    this.blogService.get(heading).subscribe({
      next: (response) => {
        this.blog = response;
        console.log(this.blog);
        this.blogGroup = this.formBuilder.group({
          heading: [this.blog.heading],
          content: [this.blog.content],
          image: [null],
        });
        setTimeout(()=>{
          (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.blog.image_url;
          
        }, 0);
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

  deleteBlog(heading: string) {
    this.blogService.delete(heading).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.navigator.navigate(['/admin/resources']);
        }
      },
    });
  }

  onSubmit(form) {
    if (this.editable || !this.submitted) {
      this.submitted = true;
      let formData = new FormData(form);
      this.blogService.edit(formData, this.blog.heading).subscribe({
        next: (response) => {
          // console.log(response);
          this.edited = true;
          this.submitted = false;
        },
      });
    }
  }
}
