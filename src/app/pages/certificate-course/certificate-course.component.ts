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



@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './certificate-course.component.html',
    styleUrls: ['./certificate-course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, CertificateCourseListComponent]
})
export class CertificateCourseComponent {
  // private course_name!: any;
  public course: CertificateCourse | null = null;
  loaded: boolean = false;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  date: Date;
  price: Price;
  message_text: string;
  // ms = ['cl', 'cl', 'cl']
  constructor (private certificateCourseService: CertificateCourseService, private route: ActivatedRoute) {}

  ngOnInit() {
    let course_code;
    console.log('before', this.course);
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_code = param.get('course_code')});
    this.certificateCourseService.get(course_code).subscribe({
      next: (response) => {
        this.loaded = true;
        this.course = response;
        this.modules = <Module[]>JSON.parse(this.course.modules);
        this.prerequisites = <string[]>JSON.parse(this.course.prerequisites);
        this.objectives = <string[]>JSON.parse(this.course.objectives);
        this.attendees = <string[]>JSON.parse(this.course.attendees);
        // this.date = <Date>JSON.parse(this.course.date);
        // this.date.start = moment(this.date.start).format('MMMM Do YYYY');
        // this.date.end = moment(this.date.end).format('MMMM Do YYYY');
        this.price = <Price>JSON.parse(this.course.price);
        this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.code.toUpperCase()}. My name is ___`;
        console.log(this.objectives);
      }
    });
  }
}
