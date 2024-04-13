import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { ModuleItemComponent } from "../../partials/module-item/module-item.component";
import { FaqItemComponent } from "../../partials/faq-item/faq-item.component";
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import moment from 'moment';
import { CertificateCourseListComponent } from 'src/app/partials/certificate-course-list/certificate-course-list.component';
import { CertificateCourse, Module, Date, Price } from 'src/app/interfaces/certificate-course';
import { CertificateCourseService } from 'src/app/services/certificate-course.service';
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
    templateUrl: './certificate-course.component.html',
    styleUrls: ['./certificate-course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, CertificateCourseListComponent, ReactiveFormsModule, CartButtonComponent, FaqListComponent, ContactUsFormComponent, ContactUsButtonComponent, EmptyContentComponent]
})
export class CertificateCourseComponent {
  // private course_name!: any;
  public course: CertificateCourse | null = null;
  fetching_course: boolean = false;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  date: Date;
  price: Price;
  message_text: string;
  type: 'virtual' | 'physical' = 'virtual';
  requestGroup: FormGroup;
  submitted: boolean = false;
  posted: boolean =false;
  course_code: string;
  carted: boolean = false;
  no_course: string = null;



  constructor (private certificateCourseService: CertificateCourseService, private route: ActivatedRoute, private auth: AuthService, private cart: CartService) {}

  ngOnInit() {
      let paramObservable = this.route.paramMap;
      paramObservable.subscribe((param) => {
        this.course_code = param.get('course_code')
        this.getCourse()
      });
    }
    
  getCourse() {
    this.fetching_course = true;
    this.certificateCourseService.get(this.course_code).subscribe({
      next: (response) => {
        this.fetching_course = false;
        if (response.status == 'failed') {
          this.no_course = response.message;
          return;
        }
        this.course = response.course;
        if (this.auth.isLoggedIn('student') && this.cart.has('certificate_courses', this.course.code)) this.carted = true;
        this.modules = <Module[]>JSON.parse(this.course.modules);
        this.prerequisites = <string[]>JSON.parse(this.course.prerequisites);
        this.objectives = <string[]>JSON.parse(this.course.objectives);
        this.attendees = <string[]>JSON.parse(this.course.attendees);
        this.price = <Price>JSON.parse(this.course.price);
        this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.code.toUpperCase()}. My name is ___`;
        // this.setRequestFormGroup();
      }
    });
  }



  get training_location() {
    return this.type == 'virtual' ? 'Course takes place online. Further details can be obtained after course registration.' : 'Course takes place at our Lagos Training Center at 73 Allen Avenue, Ikeja, Lagos, Nigeria.';
  }
}
