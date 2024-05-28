import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import PostResponse from 'src/app/interfaces/base-response';
import { AdminService } from 'src/app/services/admin.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { requiredIfPresent } from 'src/app/custom-validators/requiredIfPresent';

@Component({
    selector: 'app-edit-admin',
    standalone: true,
    templateUrl: './edit-admin.component.html',
    styleUrl: './edit-admin.component.css',
    imports: [ReportBarComponent, CommonModule, ReactiveFormsModule, EmptyContentComponent, RedirectButtonComponent, TooltipComponent]
})
export class EditAdminComponent implements OnInit {

  editable: boolean = false;

  fetching: boolean = false;
  error: string = null;


  edited: boolean = false;

  admin: Admin = null;

  adminGroup: FormGroup;
  admin_email: string = null;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;

  server_validation_errors: object = {
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    password: null,
    password_confirmation: null,
  };
  backWithErrors: boolean;
  errorneousFields: string[];
  errorsRectified: number;

  
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.admin_email = params.get('email');
    });

    this.fetch_admin();

  }

  fetch_admin() {
    this.fetching = true;
    this.adminService.get(this.admin_email).subscribe({
      next: (response) => {
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.handleFetchAdminResponse(response);
      }
    });
  }

  handleFetchAdminResponse(response: {
    status: string;
    message?: string;
    admin?: Admin;
  }) {
    this.admin = response.admin;
    this.error = null;

    this.adminGroup = this.formBuilder.group({
      first_name: [this.admin.first_name, Validators.required],
      last_name: [this.admin.last_name, Validators.required],
      email: [this.admin.email, [Validators.required, Validators.email]],
      phone_number: [this.admin.phone_number, Validators.required],
      password: [''],
      password_confirmation: [''],
      image: [null],
    });

    if (this.admin.image_url) {
      this.pictureSelected = true;
      setTimeout(()=>{
        (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.admin.image_url;
      }, 0);
    }
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

  get location() {
    return `/admin/admin/${this.admin_email}`;
  }

  onSubmit(form) {
    this.password_confirmation.setValidators([requiredIfPresent('password')]);
    this.password_confirmation.updateValueAndValidity();
    

    this.tried_to_submit = true;
    
    if (this.adminGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);

    if (!this.password.value) {
      formData.delete('password');
      formData.delete('password_confirmation');
    }



    this.adminService.update(formData, this.admin_email).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.formError = response.message;
          return;
        }
        this.handleResponse(response);
      },
      error: (response) => {
        this.handleServerError(response)
      }
    });
  }

  handleResponse(response: PostResponse) {
    this.formError = null;
    this.edited = true;
  }

  handleServerError(response: any) {
    this.errorsRectified = 0;
        this.server_validation_errors = response.error.errors;
        this.errorneousFields = Object.keys(this.server_validation_errors).filter((key)=> this.server_validation_errors[key] != null);
        let rectifyField = (event: Event) => {
          if (this.server_validation_errors[(<HTMLInputElement>event.target).name] == null) return;
          event.target.removeEventListener('input', rectifyField);
          this.errorsRectified++;
          this.server_validation_errors[(<HTMLInputElement>event.target).getAttribute('name')] = null;
        }
        this.submitted = false;
        this.backWithErrors = true;
        if (this.errorneousFields.length > 0) {
          for (let key of this.errorneousFields) {
            document.querySelector(`input[name=${key}]`).addEventListener('input', rectifyField);
          }
        }
  }
}
