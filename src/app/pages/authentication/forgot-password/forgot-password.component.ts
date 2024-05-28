import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  @Input() type: string;
  @Output() canceled = new EventEmitter();


  resetGroup: FormGroup;
  submitted: boolean = false;
  formError: string;
  errorsRectified: number = 0;
  errors: object = {email: null,};
  errorneousFields: string[];
  backWithErrors: boolean = false;
  linkSent: boolean = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {

    this.resetGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }


  get email() {
    return this.resetGroup.get('email').value;
  }

  cancel() {
    this.canceled.emit();
  }

  onSubmit(form: HTMLFormElement) {
    this.submitted = true;
    let form_data = new FormData(form);
    this.loginService.send_password_reset_link(form_data).subscribe({
      next: (response) => {
        response.subscribe({
          next: (response) => {
            this.submitted = false;
            if (response.status == 'failed') this.formError = response.message;
            else {
              this.handleResponse();
            }
          },
          error: (response) => {
            this.errorsRectified = 0;
            this.errors = response.error.errors;
            this.errorneousFields = Object.keys(this.errors).filter((key)=> this.errors[key] != null);
            let rectifyField = (event: Event) => {
              if (this.errors[(<HTMLInputElement>event.target).name] == null) return;
              event.target.removeEventListener('input', rectifyField);
              this.errorsRectified++;
              this.errors[(<HTMLInputElement>event.target).getAttribute('name')] = null;
            }
            this.submitted = false;
            this.backWithErrors = true;
            if (this.errorneousFields.length > 0) {
              for (let key of this.errorneousFields) {
                document.querySelector(`input[name=${key}]`).addEventListener('input', rectifyField);
              }
            }
          }
        })
      },
    });
  }

  handleResponse () {
    this.linkSent = true;
  }
}
