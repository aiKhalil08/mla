import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Timer } from 'easytimer.js';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import LoginResponse from 'src/app/interfaces/login-response';
import { AuthService } from 'src/app/services/auth.service';
import { JWTService } from 'src/app/services/jwt.service';
import { StudentService } from 'src/app/services/student.service';
import environment from 'src/environment';

@Component({
  selector: 'app-student-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RecaptchaFormsModule, RecaptchaModule],
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent implements OnInit{

  studentGroup: FormGroup;
  otpGroup: FormGroup;
  errors: object = {
    first_name: null,
    last_name: null,
    phone_number: null,
    email: null,
    password: null,
    password_confirmation: null,
    otp: null,
  };
  submitted_one: boolean = false;
  backWithErrors_one: boolean;
  errorneousFields_one: string[];
  errorsRectified_one: number;
  submitted_two: boolean = false;
  backWithErrors_two: boolean;
  errorneousFields_two: string[];
  errorsRectified_two: number;
  invalid_credentials: boolean = false;
  logged_in: boolean = false;
  expired_session: boolean = false;

  redirected_from_portal: boolean = false; //when true, it indicates that the user is logged in but redirected to this component because they haven't verified their email. only the second form will be shown if true

  showConfirmForm: boolean = false;

  formTwoError: string;

  countdown: string = '15:00';

  canReqeustOTP: boolean = false;
  formOneError: string;
  confirmFormError: string;

  siteKey: string = environment.recaptcha.siteKey;
  recaptchaResolved: boolean = false;
  showRecaptcha: boolean = false;



  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private tokenService: JWTService, private auth: AuthService) {
    if (String(document.location.pathname).match(/\/verify-email$/)) {
      this.showConfirmForm = true;
      this.redirected_from_portal = true;
      this.startCountdown();
    }
  }

  ngOnInit(): void {
    this.setSlider();
    this.studentGroup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });

    this.otpGroup = this.formBuilder.group({
      email: [this.email],
      otp: ['', Validators.required],
    });
  }

  handleResolved(response: string) {
    console.log(response)
    if (response.length > 0) this.recaptchaResolved = true;
  }

  startCountdown() {
    let timer = new Timer();
    timer.start({countdown: true, startValues: {seconds: 60 * 15}, target: {seconds: 0}});
    timer.addEventListener('secondsUpdated', ()=> {
      this.countdown = timer.getTimeValues().toString(['minutes', 'seconds'])
    });
    timer.addEventListener('targetAchieved', () => {
      this.canReqeustOTP = true;
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

  get first_name() {
    return this.studentGroup.get('first_name');
  }

  get last_name() {
    return this.studentGroup.get('last_name');
  }

  get email() {
    if (this.redirected_from_portal) return this.auth.user().email;
    return this.studentGroup.get('email').value;
  }

  get phone_number() {
    return this.studentGroup.get('phone_number');
  }

  get password() {
    return this.studentGroup.get('password');
  }

  get password_confirmation() {
    return this.studentGroup.get('password_confirmation');
  }
  
  
  onSubmitOne(form: HTMLFormElement) {
    if (!this.showRecaptcha) {
      this.showRecaptcha = true;
      return;
    }
    if (!this.recaptchaResolved) {
      this.formOneError = 'Please complete the reCAPTCHA';
      return;
    }
    this.submitted_one = true;
    let form_data = new FormData(form);
    this.studentService.add(form_data).subscribe({
      next: (response) => {
        response.subscribe({
          next: (response) => {
            this.submitted_one = false;
            if (response.status == 'failed') this.formOneError = response.message;
            else {
              this.handleResponseOne();
            }
          },
          error: (response) => {
            this.errorsRectified_one = 0;
            this.errors = response.error.errors;
            this.errorneousFields_one = Object.keys(this.errors).filter((key)=> this.errors[key] != null);
            let rectifyField = (event: Event) => {
              if (this.errors[(<HTMLInputElement>event.target).name] == null) return;
              event.target.removeEventListener('input', rectifyField);
              this.errorsRectified_one++;
              this.errors[(<HTMLInputElement>event.target).getAttribute('name')] = null;
            }
            this.submitted_one = false;
            this.backWithErrors_one = true;
            if (this.errorneousFields_one.length > 0) {
              for (let key of this.errorneousFields_one) {
                document.querySelector(`input[name=${key}]`).addEventListener('input', rectifyField);
              }
            }
          }
        })
      },
    });
  }

  onSubmitTwo(form: HTMLFormElement) {
    this.submitted_two = true;
    let form_data = new FormData(form);
    this.studentService.confirm_email(form_data).subscribe({
      next: (response) => {
        this.submitted_two = false;
        if (response.status == 'failed') this.confirmFormError = response.message;
        else {
          this.handleResponseTwo(response);
        }
      },
      error: (response) => {
        this.errorsRectified_two = 0;
        this.errors = response.error.errors;
        this.errorneousFields_two = Object.keys(this.errors).filter((key)=> this.errors[key] != null);
        let rectifyField = (event: Event) => {
          if (this.errors[(<HTMLInputElement>event.target).name] == null) return;
          event.target.removeEventListener('input', rectifyField);
          this.errorsRectified_two++;
          this.errors[(<HTMLInputElement>event.target).getAttribute('name')] = null;
        }
        this.submitted_two = false;
        this.backWithErrors_two = true;
        if (this.errorneousFields_two.length > 0) {
          for (let key of this.errorneousFields_two) {
            document.querySelector(`input[name=${key}]`).addEventListener('input', rectifyField);
          }
        }
      }
    });
  }

  resendOTP() {
    this.studentService.resend_otp('student', this.email).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.canReqeustOTP = false;
          this.countdown = '15:00';
          this.startCountdown();
        }
      }
    });
  }


  handleResponseOne () {
    this.showConfirmForm = true;
    this.startCountdown();
  }

  handleResponseTwo (response: LoginResponse) {
    this.logged_in = true;
    this.tokenService.set(response.access_token);
    document.location.href = 'home';
  }
  
}
