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
import { OffshoreCourseService } from 'src/app/offshore-course.service';
import { CertificateCourseListComponent } from "../../partials/certificate-course-list/certificate-course-list.component";



@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './offshore-course.component.html',
    styleUrls: ['./offshore-course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, OffshoreCourseListComponent, CertificateCourseListComponent]
})
export class OffshoreCourseComponent {
  // private course_name!: any;
  public course: OffshoreCourse | null = null;
  loaded: boolean = false;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  date: Date;
  price: Price;
  message_text: string;
  // ms = ['cl', 'cl', 'cl']
  constructor (private offshoreCourseService: OffshoreCourseService, private route: ActivatedRoute) {}

  ngOnInit() {
    let course_title;
    console.log('before', this.course);
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_title = param.get('course_title')});
    this.offshoreCourseService.get(course_title).subscribe({
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
        this.message_text = `Hello. I am chatting you regarding ${this.course.title.toUpperCase()} - ${this.course.title.toUpperCase()}. My name is ___`;
        // console.clear();
        // console.log(this.course);
        // console.log(this.course.objectives);
        // console.log(JSON.parse(<any>this.course.objectives));
      }
    }); 
  }
}
