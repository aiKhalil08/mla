import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { BlogService } from 'src/app/services/blog.service';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
    selector: 'app-add-testimonial',
    standalone: true,
    templateUrl: './add-testimonial.component.html',
    styleUrls: ['./add-testimonial.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent]
})
export class AddTestimonialComponent implements OnInit {
  testimonialGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  
  constructor(private testimonialService: TestimonialService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.testimonialGroup = this.formBuilder.group({
      name: [''],
      message: [''],
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

  onSubmit(form) {
    this.submitted = true;
    let formData = new FormData(form);
    this.testimonialService.add(formData).subscribe({
      next: (response) => {
        // console.log(response);
        this.created = true;
        this.submitted = false;
      },
    });
  }
}
