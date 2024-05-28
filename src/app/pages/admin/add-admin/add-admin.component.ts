import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { BlogService } from 'src/app/services/blog.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import PostResponse from 'src/app/interfaces/base-response';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'app-add-admin',
    standalone: true,
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent, ReportBarComponent, TooltipComponent]
})
export class AddAdminComponent implements OnInit {
  adminGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  
  constructor(private adminService: AdminService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.adminGroup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      image: [null],
    });
  }


  get form_invalid() {
    
    return this.adminGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('email' in control.errors) return 'Please input a valid email address.';
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

  get first_name() {
    return this.adminGroup.get('first_name');
  }

  get last_name() {
    return this.adminGroup.get('last_name');
  }

  get email() {
    return this.adminGroup.get('email');
  }

  get phone_number() {
    return this.adminGroup.get('phone_number');
  }

  get password() {
    return this.adminGroup.get('password');
  }

  get password_confirmation() {
    return this.adminGroup.get('password_confirmation');
  }

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.adminGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);



    this.adminService.add(formData).subscribe({
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
