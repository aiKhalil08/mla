import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CartItem } from 'src/app/interfaces/cart';
import { CourseItem } from 'src/app/interfaces/courses';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [],
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: CourseItem;
  @Input() type: 'carted' | 'enrolled';
  // @Input() enrollment_type: 'cohort' | 'individual';
  course_category: string;
  course_identity: string;

  constructor(private router: Router) {}


  ngOnInit(): void {
    switch(this.course.category) {
      case 'certificate_courses':
        this.course_category = 'Certificate course';
        this.course_identity = this.course.code;
        break;
      case 'certification_courses':
        this.course_category = 'Certification course';
        this.course_identity = this.course.code;
        break;
      case 'offshore_courses':
        this.course_category = 'Offshore course';
        this.course_identity = this.course.title;
        break;
    }
    // console.log(this.course);
  }

  get course_name() {
    let name = this.course.title;
    if (this.course.code) name += ' - '+this.course.code;
    return name;
  }

  get category() {
    return this.course_category;
  }

  get identity() {
    return this.course_identity;
  }

  onClick() {
    let params = {'coe': this.type};
    params['cat'] = this.course_category;

    if (this.type == 'carted') {
      params['name'] = this.course_identity;
    } else if (this.type == 'enrolled') {
      params['et'] = this.course.enrollment_type;
      if (this.course.enrollment_type == 'cohort') params['name'] = this.course.cohort_name;
      else {
        // params['cat'] = this.course_category;
        params['name'] = this.course_identity;
      }
    }

    // console.log(params); return;
    this.router.navigate([`/home/course`,], {queryParams: params});
  }
}
