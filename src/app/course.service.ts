import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course, CourseItem } from './interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: any) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/course/create`;
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
  getList(itemsCount: number) {
    let url = `${this.domain_name}/courses/${itemsCount || 'all'}`;
    return <Observable<CourseItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(course_code: string) {
    let url = `${this.domain_name}/course/${course_code}`;
    return <Observable<Course>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
