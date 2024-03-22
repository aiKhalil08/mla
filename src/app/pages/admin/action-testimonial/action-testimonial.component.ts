import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonComponent } from "../../../partials/buttons/action-button/action-button.component";
import { Testimonial } from 'src/app/interfaces/testimonial';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
    selector: 'app-action-testimonial',
    standalone: true,
    templateUrl: './action-testimonial.component.html',
    styleUrls: ['./action-testimonial.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ActionButtonComponent]
})
export class ActionTestimonialComponent implements OnInit {
  testimonial!: Testimonial;
  // course_code!: string;
  testimonialGroup!: FormGroup;
  pictureSelected: boolean = true;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;

  constructor(private formBuilder: FormBuilder, private testimonialService: TestimonialService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    this.testimonialService.get(name).subscribe({
      next: (response) => {
        this.testimonial = response;
        console.log(this.testimonial);
        this.testimonialGroup = this.formBuilder.group({
          name: [this.testimonial.name],
          message: [this.testimonial.message],
          image: [null],
        });
        setTimeout(()=>{
          (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.testimonial.image_url;
          
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

  deletetTestimonial(name: string) {
    this.testimonialService.delete(name).subscribe({
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
      this.testimonialService.edit(formData, this.testimonial.name).subscribe({
        next: (response) => {
          // console.log(response);
          this.edited = true;
          this.submitted = false;
        },
      });
    }
  }
}
