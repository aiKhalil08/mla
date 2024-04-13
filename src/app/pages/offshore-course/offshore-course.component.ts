import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { ModuleItemComponent } from "../../partials/module-item/module-item.component";
import { FaqItemComponent } from "../../partials/faq-item/faq-item.component";
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import moment from 'moment';
import { OffshoreCourseListComponent } from 'src/app/partials/offshore-course-list/offshore-course-list.component';
import { OffshoreCourse, Module, Date, Price } from 'src/app/interfaces/offshore-course';
import { OffshoreCourseService } from 'src/app/services/offshore-course.service';
import { CertificateCourseListComponent } from "../../partials/certificate-course-list/certificate-course-list.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartButtonComponent } from "../../partials/cart-button/cart-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FaqListComponent } from "../../partials/faq-list/faq-list.component";
import { ContactUsFormComponent } from "../../partials/contact-us-form/contact-us-form.component";
import { ContactUsButtonComponent } from "../../partials/contact-us-button/contact-us-button.component";
import { EmptyContentComponent } from "../../partials/empty-content/empty-content.component";



@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './offshore-course.component.html',
    styleUrls: ['./offshore-course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, OffshoreCourseListComponent, CertificateCourseListComponent, ReactiveFormsModule, CartButtonComponent, FaqListComponent, ContactUsFormComponent, ContactUsButtonComponent, EmptyContentComponent]
})
export class OffshoreCourseComponent {
  // private course_name!: any;
  public course: OffshoreCourse | null = null;
  fetching_course: boolean = false;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  date: Date = null;
  price: Price;
  message_text: string;
  requestGroup: FormGroup;
  submitted: boolean = false;
  posted: boolean = false;
  course_title: string;
  carted: boolean = false;
  no_course: string = null;
  

  constructor (private offshoreCourseService: OffshoreCourseService, private route: ActivatedRoute, private auth: AuthService, private cart: CartService) {}

  ngOnInit() {
    console.log('before', this.course);
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      this.course_title = param.get('course_title');
      this.getCourse();
    }); 
  }

  getCourse() {
    this.fetching_course = true;
    this.offshoreCourseService.get(this.course_title).subscribe({
      next: (response) => {
        this.fetching_course = false;
        if (response.status == 'failed') {
          this.no_course = response.message;
          return;
        }
        this.course = response.course;
        if (this.auth.isLoggedIn('student') && this.cart.has('offshore_courses', this.course.title)) this.carted = true;
        this.modules = <Module[]>JSON.parse(this.course.modules);
        this.prerequisites = <string[]>JSON.parse(this.course.prerequisites);
        this.objectives = <string[]>JSON.parse(this.course.objectives);
        this.attendees = <string[]>JSON.parse(this.course.attendees);
        if (this.course.date != 'null') {
          this.date = <Date>JSON.parse(this.course.date);
          // console.log('are you here', this.date, moment(this.date.start).format('MMMM Do YYYY'))
          // console.log(this.date, this.course.date)
        }
        this.price = <Price>JSON.parse(this.course.price);
        this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.title.toUpperCase()}. My name is ___`;
        // this.setRequestFormGroup();
      }
    });
  }

  get start_date() {
    return this.date.start ? moment(this.date.start).format('MMMM Do YYYY') : 'Not set';
  }

  get end_date() {
    return this.date.end ? moment(this.date.end).format('MMMM Do YYYY') : 'Not set';
  }

  get duration() {
    if (this.date.duration == null && this.date['duration-unit'] == null) return 'Not set';
    return `${this.date.duration} ${this.date['duration-unit']}`;
  }

}
