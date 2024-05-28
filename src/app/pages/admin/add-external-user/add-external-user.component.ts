import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BaseResponse from 'src/app/interfaces/base-response';
import { ExternalUserService } from 'src/app/services/external-user.service';
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TooltipComponent } from 'src/app/partials/tooltip/tooltip.component';
import { COMPANIES } from '../../../companies';

@Component({
    selector: 'app-add-external-user',
    standalone: true,
    templateUrl: './add-external-user.component.html',
    styleUrl: './add-external-user.component.css',
    imports: [ReportBarComponent, CommonModule, ReactiveFormsModule, TooltipComponent, RedirectButtonComponent, MatFormFieldModule, MatSelectModule, MatInputModule, MatSlideToggleModule]
})
export class AddExternalUserComponent implements OnInit {
  userGroup: FormGroup;
  pictureSelected: boolean = false;
  created: boolean = false;
  submitted: boolean = false;
  formError: string = null;
  tried_to_submit: boolean = false;
  companies: string[] = COMPANIES;

  
  constructor(private userService: ExternalUserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userGroup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      generate_password_automatically: [true],
      password: [''],
      password_confirmation: [''],
    });

    // makes password fields required or not based on the value of generate_password_automatically
    this.generate_password_automatically.valueChanges.subscribe((value) => {
      if (value == false) {
        this.password.addValidators(Validators.required);
        this.password_confirmation.addValidators(Validators.required);
      } else if (value == true) {
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

  get generate_password_automatically() {
    return this.userGroup.get('generate_password_automatically');
  }

  get email() {
    return this.userGroup.get('email');
  }

  get password() {
    return this.userGroup.get('password');
  }

  get password_confirmation() {
    return this.userGroup.get('password_confirmation');
  }

  onSubmit(form) {
    this.tried_to_submit = true;
    
    if (this.userGroup.invalid) return;

    this.submitted = true;
    let formData = new FormData(form);
    formData.append('company', this.company.value);



    this.userService.add(formData).subscribe({
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

  handleResponse(response: BaseResponse) {
    this.formError = null;
    this.created = true;
  }
}
