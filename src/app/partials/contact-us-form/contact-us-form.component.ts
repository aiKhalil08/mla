import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})
export class ContactUsFormComponent implements OnInit {

  requestGroup: FormGroup;
  @Input() course?: {title: string, code?: string} = null;
  submitted: boolean = false;
  posted: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private requestService: RequestService) {}

  ngOnInit(): void {
    let first_name = '';
    let last_name = '';
    let phone_number = '';
    let email_address = '';
    let message = '';
    if (this.auth.isLoggedIn('student')) {
      first_name = this.auth.user().first_name;
      last_name = this.auth.user().last_name;
      // phone_number = this.auth.user().pone;
      email_address = this.auth.user().email;
    }

    if (this.course) {
      message = `Hi, I am writing regarding ${this.course.title}`;
      if (this.course.code) message += `- ${this.course.code}`;
    }

    this.requestGroup = this.formBuilder.group({
      first_name: [first_name, Validators.required],
      last_name: [last_name, Validators.required],
      phone_number: ['', Validators.required],
      email_address: [email_address, Validators.required],
      message: [message, Validators.required]
    });
  }


  onRequestSubmit(form: HTMLFormElement) {
    this.submitted = true;
    let formData = new FormData(form);
    this.requestService.post(formData).subscribe({
      next: (response) => {
        this.posted = true;
        this.submitted = false;
      }
    });
  }

}
