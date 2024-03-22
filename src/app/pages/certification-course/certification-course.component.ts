import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { ModuleItemComponent } from "../../partials/module-item/module-item.component";
import { FaqItemComponent } from "../../partials/faq-item/faq-item.component";
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import moment from 'moment';
import { CertificationCourseListComponent } from 'src/app/partials/certification-course-list/certification-course-list.component';
import { CertificationCourse, Module, Date, Price } from 'src/app/interfaces/certification-course';
import { CertificationCourseService } from 'src/app/services/certification-course.service';
import { CertificateCourseListComponent } from "../../partials/certificate-course-list/certificate-course-list.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartButtonComponent } from "../../partials/cart-button/cart-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FaqListComponent } from "../../partials/faq-list/faq-list.component";
import { ContactUsFormComponent } from "../../partials/contact-us-form/contact-us-form.component";
import { ContactUsButtonComponent } from "../../partials/contact-us-button/contact-us-button.component";



@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './certification-course.component.html',
    styleUrls: ['./certification-course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, CertificationCourseListComponent, CertificateCourseListComponent, ReactiveFormsModule, CartButtonComponent, FaqListComponent, ContactUsFormComponent, ContactUsButtonComponent]
})
export class CertificationCourseComponent {
  // private course_name!: any;
  public course: CertificationCourse | null = null;
  loaded: boolean = false;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  date: Date;
  price: Price;
  message_text: string;
  submitted: boolean = false;
  posted: boolean = false;
  requestGroup: FormGroup;
  course_code: string;
  carted: boolean = false;
  
  constructor (private certificationCourseService: CertificationCourseService, private route: ActivatedRoute,  private auth: AuthService, private cart: CartService) {}

  ngOnInit() {
    // console.log('before', this.course);
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      this.course_code = param.get('course_code');
      this.getCourse();
    }); 
  }

  getCourse() {
    this.certificationCourseService.get(this.course_code).subscribe({
      next: (response) => {
        this.loaded = true;
        this.course = response;
        if (this.auth.isLoggedIn('student') && this.cart.has('certification_courses', this.course.code)) this.carted = true;
        this.modules = <Module[]>JSON.parse(this.course.modules);
        this.prerequisites = <string[]>JSON.parse(this.course.prerequisites);
        this.objectives = <string[]>JSON.parse(this.course.objectives);
        this.attendees = <string[]>JSON.parse(this.course.attendees);
        // this.date = <Date>JSON.parse(this.course.date);
        // this.date.start = moment(this.date.start).format('MMMM Do YYYY');
        // this.date.end = moment(this.date.end).format('MMMM Do YYYY');
        // this.price = <Price>JSON.parse(this.course.price);
        this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.code.toUpperCase()}. My name is ___`;
        // this.setRequestFormGroup();
      }
    });
  }

}
