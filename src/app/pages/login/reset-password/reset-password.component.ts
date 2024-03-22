import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  validation_complete: boolean = false;
  link_invalid?: string = null;

  passwordGroup: FormGroup;
  submitted: boolean = false;
  formError: string;
  errorsRectified: number = 0;
  errors: object = {password: null, password_confirmation: null};
  errorneousFields: string[];
  backWithErrors: boolean = false;
  linkSent: boolean = false;
  email: string;
  token: string;
  type: string;
  signature: string;
  passwordReset: boolean = false;


  constructor (private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signature = (new URL(document.location.href)).searchParams.get('s');
    [this.email, this.token, this.type] = String(atob(this.signature)).split(':');
    
    this.validate_link();
    this.setSlider();
    this.passwordGroup = this.formBuilder.group({
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  validate_link() {
    
    console.log(this.signature, this.email, this.token, this.type);

    this.loginService.validate_link(this.email, this.token, this.type).subscribe({
      next: (reponse) => {
        reponse.subscribe({
          next: (response) => {
          this.validation_complete = true;
            if (response.status == 'failed') this.link_invalid = response.message;
            // else {
            //   this.handleValidateResponse();
            // }
          }
        });
      }
    });
  }

  setSlider() {
    let left_slide = document.querySelector('#left-slide');
    let right_slide = document.querySelector('#right-slide');
    setTimeout(()=> {
        left_slide.classList.add('first-visible');
    }, 0);
    setTimeout(() => {
        left_slide.classList.remove('first-state');
        left_slide.classList.remove('first-visible');
        left_slide.classList.add('custom-hidden');
        right_slide.classList.remove('custom-hidden');
        right_slide.classList.add('custom-visible');
        setInterval(() => {
            left_slide.classList.toggle('custom-hidden');
            left_slide.classList.toggle('custom-visible');
            right_slide.classList.toggle('custom-hidden');
            right_slide.classList.toggle('custom-visible');
        }, 19000);
    }, 11000);
  }

  onSubmit(form: HTMLFormElement) {
    this.submitted = true;
    let form_data = new FormData(form);
    this.loginService.reset_password(form_data, this.email, this.type).subscribe({
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
  }

  handleResponse () {
    this.passwordReset = true;
  }

  redirect_to_login() {
    if (this.type == 'student') this.router.navigate(['/login']);
  }

  // handleValidateResponse() {

  // }

}
