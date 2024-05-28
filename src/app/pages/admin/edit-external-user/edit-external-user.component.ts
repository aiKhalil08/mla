import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import BaseResponse from 'src/app/interfaces/base-response';
import { ExternalUser } from 'src/app/interfaces/external-user';
import { ExternalUserService } from 'src/app/services/external-user.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { ActivatedRoute } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmptyContentComponent } from 'src/app/partials/empty-content/empty-content.component';
import { RedirectButtonComponent } from 'src/app/partials/buttons/redirect-button/redirect-button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { COMPANIES } from 'src/app/companies';

@Component({
    selector: 'app-edit-external-user',
    standalone: true,
    templateUrl: './edit-external-user.component.html',
    styleUrl: './edit-external-user.component.css',
    imports: [CommonModule, ReactiveFormsModule, ReportBarComponent, TooltipComponent, MatFormFieldModule, MatSelectModule, MatInputModule, EmptyContentComponent, RedirectButtonComponent, MatSlideToggleModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditExternalUserComponent implements OnInit {
  editable: boolean = false;

  fetching: boolean = false;
  error: string = null;

  edited: boolean = false;

  user: ExternalUser;
  user_email: string;

  userGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;
  companies: string[] = COMPANIES;
  errorsRectified: number;
  errorneousFields: string[];
  backWithErrors: boolean;

  server_validation_errors: object = {
    first_name: null,
    last_name: null,
    email: null,
    company: null,
    password: null,
    password_confirmation: null,
  };

  
  constructor(private userService: ExternalUserService, private formBuilder: FormBuilder, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.user_email = params.get('email');
    });

    this.fetchExternalUser();
  }

  fetchExternalUser() {
    this.fetching = true;
    this.userService.get(this.user_email).subscribe({
      next: (response) => {
          this.fetching = false;
          if (response.status == 'failed') {
            this.error = response.message;
            return;
          }
          this.handleFetchExternalUserResponse(response);
      }
    });
  }

  handleFetchExternalUserResponse(response: {
    status: string;
    message?: string;
    user?: ExternalUser;
  }) {
    this.user = response.user;
    this.error = null;

    this.userGroup = this.formBuilder.group({
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      company: [{value: this.user.company.name, disabled: true}, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      change_password: [{value: false, disabled: true}],
      password: [''],
      password_confirmation: [''],
    });

    // makes password fields required or not based on the value of generate_password_automatically
    this.change_password.valueChanges.subscribe((value) => {
      if (value == true) {
        this.password.addValidators(Validators.required);
        this.password_confirmation.addValidators(Validators.required);
      } else if (value == false) {
        this.password.removeValidators(Validators.required);
        this.password_confirmation.removeValidators(Validators.required);
      }

      this.password.updateValueAndValidity();
      this.password_confirmation.updateValueAndValidity();
    })

  }


  get form_invalid() {
    
    return this.userGroup.invalid;
  }

  get_error_message(control: AbstractControl): string {

    if ('required' in control.errors) return 'This field is required.';
    else if ('email' in control.errors) return 'Please input a valid email address.';
    else if ('pattern' in control.errors) return 'Please input the right data format for this field.';

    return ''
    
  }

  get first_name() {
    return this.userGroup.get('first_name');
  }

  get last_name() {
    return this.userGroup.get('last_name');
  }

  get company() {
    return this.userGroup.get('company');
  }

  get email() {
    return this.userGroup.get('email');
  }

  get change_password() {
    return this.userGroup.get('change_password');
  }

  get password() {
    return this.userGroup.get('password');
  }

  get password_confirmation() {
    return this.userGroup.get('password_confirmation');
  }

  get location() {
    return `/admin/external-users`;
  }

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.userGroup.invalid) return;

    this.submitted = true;

    let formData = new FormData(form);
    formData.append('company', this.company.value);

    if (!this.password.value) {
      formData.delete('password');
      formData.delete('password_confirmation');
    }



    this.userService.update(formData, this.user_email).subscribe({
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

  handleResponse(response: BaseResponse) {
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
