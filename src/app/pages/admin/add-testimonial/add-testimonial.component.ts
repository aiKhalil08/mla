import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { TestimonialService } from 'src/app/services/testimonial.service';
import PostResponse from 'src/app/interfaces/post-response';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';

@Component({
    selector: 'app-add-testimonial',
    standalone: true,
    templateUrl: './add-testimonial.component.html',
    styleUrls: ['./add-testimonial.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ReportBarComponent, TooltipComponent]
})
export class AddTestimonialComponent implements OnInit {
  testimonialGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;

  tried_to_submit: boolean = false;
  formError: string = null;
  
  constructor(private testimonialService: TestimonialService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.testimonialGroup = this.formBuilder.group({
      name: ['', Validators.required],
      company: [''],
      designation: [''],
      message: ['', [Validators.required, Validators.maxLength(255)]],
      image: [null],
    });
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


  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.testimonialGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    

    this.testimonialService.add(formData).subscribe({
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
