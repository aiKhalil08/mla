import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import LoginResponse from 'src/app/interfaces/login-response';
import { JWTService } from 'src/app/services/jwt.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  adminGroup: FormGroup;
  submitted: boolean = false;
  posted: boolean = false;
  errors: object = {
    username: null,
    password: null,
  };
  backWithErrors: boolean;
  errorneousFields: string[];
  errrorsRectified: number;
  invalid_credentials: boolean = false;
  logged_in: boolean = false;
  expired_session: boolean = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private tokenService: JWTService,  private storageService: StorageService) {

  }

  ngOnInit(): void {
    if (this.storageService.exists('expired_session')) {
      this.expired_session = true;
      this.storageService.remove('expired_session');
    }
    this.setSlider();
    this.adminGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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

  get username() {
    return this.adminGroup.get('username');
  }

  get password() {
    return this.adminGroup.get('password');
  }

  onSubmit(form: HTMLFormElement) {
    this.submitted = true;
    let form_data = new FormData(form);
    this.loginService.admin_login(form_data,).subscribe({
      next: (response) => {
        response.subscribe({
          next: (response) => {
            this.posted = true;
            this.submitted = false;
            if (response.status == 'failed') this.invalid_credentials = true;
            else {
              this.handleResponse(response);
            }
          },
          error: (response) => {
            this.errrorsRectified = 0;
            this.errors = response.error.errors;
            this.errorneousFields = Object.keys(this.errors).filter((key)=> this.errors[key] != null);
            let rectifyField = (event: Event) => {
              if (this.errors[(<HTMLInputElement>event.target).name] == null) return;
              event.target.removeEventListener('input', rectifyField);
              this.errrorsRectified++;
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

  handleResponse (response: LoginResponse) {
    // console.log(response);
    // let token = response.access_token;  
    this.tokenService.set(response.access_token);
    // this.tokenService.payload();
    // this.refreshTokenService.set(response.refresh_token);
    document.location.href = 'admin';
    // let payload = JSON.parse(atob(token.split('.')[1]));
    // console.log(payload);
  }
  
}
