import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { BlogService } from 'src/app/services/blog.service';

@Component({
    selector: 'app-add-blog',
    standalone: true,
    templateUrl: './add-blog.component.html',
    styleUrls: ['./add-blog.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent]
})
export class AddBlogComponent implements OnInit {
  blogGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  
  constructor(private blogService: BlogService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.blogGroup = this.formBuilder.group({
      heading: [''],
      content: [''],
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
    this.blogService.add(formData).subscribe({
      next: (response) => {
        // console.log(response);
        this.created = true;
        this.submitted = false;
      },
    });
  }
}
