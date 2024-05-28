import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { ModuleItemComponent } from "../../partials/module-item/module-item.component";
import { FaqItemComponent } from "../../partials/faq-item/faq-item.component";
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import { CertificationCourseListComponent } from 'src/app/partials/certification-course-list/certification-course-list.component';
import { CertificationCourse } from 'src/app/interfaces/certification-course';
import { CertificationCourseService } from 'src/app/services/certification-course.service';
import { CertificateCourseListComponent } from "../../partials/certificate-course-list/certificate-course-list.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartButtonComponent } from "../../partials/cart-button/cart-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FaqListComponent } from "../../partials/faq-list/faq-list.component";
import { ContactUsFormComponent } from "../../partials/contact-us-form/contact-us-form.component";
import { ContactUsButtonComponent } from "../../partials/contact-us-button/contact-us-button.component";
import { EmptyContentComponent } from "../../partials/empty-content/empty-content.component";
import { Date, Module, Price } from 'src/app/interfaces/course';



@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './certification-course.component.html',
    styleUrls: ['./certification-course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, CertificationCourseListComponent, CertificateCourseListComponent, ReactiveFormsModule, CartButtonComponent, FaqListComponent, ContactUsFormComponent, ContactUsButtonComponent, EmptyContentComponent]
})
export class CertificationCourseComponent {
  // private course_name!: any;
  public course: CertificationCourse | null = null;
  fetching_course: boolean = false;
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
  no_course: string = null;
  
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
    this.fetching_course = true;
    this.certificationCourseService.get(this.course_code).subscribe({
      next: (response) => {
        this.fetching_course = false;
        if (response.status == 'failed') {
          this.no_course = response.message;
          return;
        }
        this.course = response.course;
        if (this.auth.isLoggedIn() && this.auth.user().hasRole('student') && this.cart.has('certification_courses', this.course.code)) this.carted = true;
        this.modules = this.course.modules;
        this.prerequisites = this.course.prerequisites;
        this.objectives = this.course.objectives;
        this.attendees = this.course.attendees;
        
        this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.code.toUpperCase()}. My name is ___`;
        
      }
    });
  }

}
