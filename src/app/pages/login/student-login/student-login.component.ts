import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Timer from 'easytimer.js';
import LoginResponse from 'src/app/interfaces/login-response';
import { JWTService } from 'src/app/services/jwt.service';
import { LoginService } from 'src/app/services/login.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { StorageService } from 'src/app/services/storage.service';
import { StudentService } from 'src/app/services/student.service';
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { CartService } from 'src/app/services/cart.service';
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { AffiliateService } from 'src/app/services/affiliate.service';

@Component({
    selector: 'app-student-signup',
    standalone: true,
    templateUrl: './student-login.component.html',
    styleUrls: ['./student-login.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RouterLink, ForgotPasswordComponent]
})
export class StudentLoginComponent implements OnInit{

  studentGroup: FormGroup;
  otpGroup: FormGroup;
  errors: object = {
    email: null,
    password: null,
    otp: null
  };
  submitted_one: boolean = false;
  backWithErrors_one: boolean;
  errorneousFields_one: string[];
  errorsRectified_one: number;
  submitted_two: boolean = false;
  backWithErrors_two: boolean;
  errorneousFields_two: string[];
  errorsRectified_two: number;
  logged_in: boolean = false;
  expired_session: boolean = false;
  
  showFormTwo: boolean = false;
  
  formOneError: string;
  formTwoError: string;

  countdown: string = '15:00';

  canReqeustOTP: boolean = false;

  forgotPassword: boolean = false;


  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private tokenService: JWTService, private cartService: CartService, private watchlistService: EventWatchlistService, private storageService: StorageService, private affiliateSevice: AffiliateService) {

  }

  ngOnInit(): void {
    if (this.storageService.exists('expired_session')) {
      this.formOneError = 'Your session has expired, please revalidate';
      this.storageService.remove('expired_session');
    }
    this.setSlider();

    this.studentGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.otpGroup = this.formBuilder.group({
      email: [this.email],
      otp: ['', Validators.required],
    });

    // console.log(btoa('muhammadiidiagbon@gmail.com:123456'));
    // console.log(atob('bXVoYW1tYWRpaWRpYWdib25AZ21haWwuY29tOjEyMzQ1Ng=='))
    // this.startCountdown();
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

  get email() {
    return this.studentGroup.get('email');
  }

  get password() {
    return this.studentGroup.get('password');
  }

  onSubmitOne(form: HTMLFormElement) {
    this.submitted_one = true;
    let form_data = new FormData(form);
    this.loginService.login_one(form_data, 'student').subscribe({
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
    this.loginService.login_two(form_data, 'student').subscribe({
      next: (response) => {
        this.submitted_two = false;
        if (response.status == 'failed') this.formTwoError = response.message;
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
    this.loginService.resend_otp('student', this.email.value).subscribe({
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
    this.showFormTwo = true;
    this.startCountdown();
  }

  handleResponseTwo (response: LoginResponse) {
    this.logged_in = true;
    this.tokenService.set(response.access_token);
    this.cartService.set_cart(response.cart);
    this.watchlistService.set_watchlist(response.watchlist)
    this.affiliateSevice.set_affiliate(response.affiliate);
    if (this.storageService.exists('intended')) {
      document.location.href = this.storageService.get('intended');
      this.storageService.remove('intended');
    }
    else document.location.href = 'home';
  }

}
