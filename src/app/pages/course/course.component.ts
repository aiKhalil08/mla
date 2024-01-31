import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { ModuleItemComponent } from "../../partials/module-item/module-item.component";
import { FaqItemComponent } from "../../partials/faq-item/faq-item.component";
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import { CourseListComponent } from "../../partials/course-list/course-list.component";
import { CourseService } from 'src/app/course.service';
import { Course, Module, Date, Price } from 'src/app/interfaces/course';
import moment from 'moment';



@Component({
    selector: 'app-course',
    standalone: true,
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ModuleItemComponent, RouterLink, FaqItemComponent, ExpandItemLinkComponent, CourseListComponent]
})
export class CourseComponent {
  // private course_name!: any;
  public course: Course | null = null;
  loaded: boolean = false;
  modules: Module[];
  prerequisites: string[];
  objectives: string[];
  attendees: string[];
  date: Date;
  price: Price;
  // ms = ['cl', 'cl', 'cl']
  constructor (private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit() {
    let course_code;
    console.log('before', this.course);
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {course_code = param.get('course_code')});
    this.courseService.get(course_code).subscribe({
      next: (response) => {
        this.loaded = true;
        this.course = response;
        this.modules = <Module[]>JSON.parse(this.course.modules);
        this.prerequisites = <string[]>JSON.parse(this.course.prerequisites);
        this.objectives = <string[]>JSON.parse(this.course.objectives);
        this.attendees = <string[]>JSON.parse(this.course.attendees);
        this.date = <Date>JSON.parse(this.course.date);
        this.date.start = moment(this.date.start).format('MMMM Do YYYY');
        this.date.end = moment(this.date.end).format('MMMM Do YYYY');
        this.price = <Price>JSON.parse(this.course.price);
        console.clear();
        console.log(this.course);
        console.log(this.course.objectives);
        console.log(JSON.parse(<any>this.course.objectives));
      }
    });
    // paramObservable.pipe(
    //   map(param => {
    //     console.log('here and param is ', param);
    //     return this.courseService.get(param.get('course_code'));
    //   })
    // ).subscribe({
    //   next: (response) => {console.log(response)},
    // });
    // paramObservable.subscribe(param => {
    //   // this.courseService.get(param.get('course_code')).s
    //   console.log(param.get('course_code'))
    // });
    // console.log(this.course)
    
  }

  // get getModules() {
  //   return <Module[]>JSON.parse(this.course.modules);
  // }

  // parse_json(string: string) {
  //   // console.log(JSON.parse(string))
  //   return <string[]>JSON.parse(string);
  // }

  // parse_modules(string: string) {
  //   // console.log(JSON.parse(string))
  //   console.log('in parse_modules',JSON.parse(string));
  //   return <Module[]>JSON.parse(string);
  // }

  // parse_date(string: string) {
  //   // console.log(JSON.parse(string))
  //   return <Date>JSON.parse(string);
  // }

  // parse_price(string: string) {
  //   // console.log(JSON.parse(string))
  //   return <Price>JSON.parse(string);
  // }

}
