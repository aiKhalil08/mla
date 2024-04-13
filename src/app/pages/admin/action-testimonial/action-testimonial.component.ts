import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { Testimonial } from 'src/app/interfaces/testimonial';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import PostResponse from 'src/app/interfaces/post-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-action-testimonial',
    standalone: true,
    templateUrl: './action-testimonial.component.html',
    styleUrls: ['./action-testimonial.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent, ReportBarComponent, TooltipComponent, EmptyContentComponent]
})
export class ActionTestimonialComponent implements OnInit {
  testimonial!: Testimonial;
  // course_code!: string;
  testimonialGroup!: FormGroup;
  pictureSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;

  fetching: boolean = false;
  no_testimonial: string = null;


  deleting: boolean = false;
  error_in_deleting: string = null;
  formError: string = null;
  tried_to_submit: boolean = false;

  constructor(private formBuilder: FormBuilder, private testimonialService: TestimonialService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    this.fetch_testimonial(name);
  }

  fetch_testimonial(name: string) {
    this.fetching = true;
    this.testimonialService.get(name).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.no_testimonial = response.message;
          return;
        }
        this.testimonial = response.testimonial;
        this.testimonialGroup = this.formBuilder.group({
          name: [this.testimonial.name, Validators.required],
          company: [this.testimonial.company],
          designation: [this.testimonial.designation],
          message: [this.testimonial.message, [Validators.required, Validators.maxLength(255)]],
          image: [null],
        });

        if (this.testimonial.image_url) {
          this.pictureSelected = true;
          setTimeout(()=>{
            (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.testimonial.image_url; 
          }, 0);
        }
      },
    });
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    // console.log('in handle')
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

  get name() {
    return this.testimonialGroup.get('name');
  }

  get message() {
    return this.testimonialGroup.get('message');
  }

  get form_invalid() {
    
    return this.testimonialGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';
    else if ('maxlength' in control.errors) return 'Length of characters cannot be more than 255';

    return ''
    
  }


  
  deleteTestimonial(name: string) {
    this.deleting = true;
    this.testimonialService.delete(name).subscribe({
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
    
    if (this.testimonialGroup.invalid) return;

      this.submitted = true;
      let formData = new FormData(form);
      this.testimonialService.edit(formData, this.testimonial.name).subscribe({
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
