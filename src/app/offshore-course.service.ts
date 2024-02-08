import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { OffshoreCourse, OffshoreCourseItem } from './interfaces/offshore-course';

@Injectable({
  providedIn: 'root'
})
export class OffshoreCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/offshore-course/create`;
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
    return this.http.post(url, course, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  edit(course: FormData, course_title: string) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/offshore-course/${course_title}/edit`;
    // console.log(course.get('image'));
    // console.log(course.get('sch'));

    // console.log(course.get('code'))
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
    return this.http.post(url, course, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  delete(course_title: string) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/offshore-course/${course_title}/delete`;
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
    return <Observable<{status: string}>>this.http.delete(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/offshore-courses/${itemsCount}`;
    return <Observable<OffshoreCourseItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(course_title: string) {
    let url = `${this.domain_name}/offshore-course/${course_title}`;
    return <Observable<OffshoreCourse>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
