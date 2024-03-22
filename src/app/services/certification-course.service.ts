import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CertificationCourse, CertificationCourseItem } from '../interfaces/certification-course';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CertificationCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    let url = `${this.domain_name}/admin/certification-course/create`;
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
    return this.http.post(url, course);
  }

  edit(course: FormData, course_code: string) {
    let url = `${this.domain_name}/admin/certification-course/${course_code}/edit`;
    // console.log(course.get('image'));
    // console.log(course.get('sch'));

    // console.log(course.get('code'))
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
  //   function getCookie(name) {
  //     let cookies = document.cookie.split('; ');
  //     for (let cookie of cookies) {
  //         let [cookieName, cookieValue] = cookie.split('=');
  //         if (cookieName === name) {
  //             return decodeURIComponent(cookieValue);
  //         }
  //     }
  //     return null;
  // }
  //   console.log(getCookie('XSRF-TOKEN'));
    return this.http.post(url, course, {
      headers: new HttpHeaders({
        // 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), 
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }), withCredentials: true,
    });
  }

  delete(course_code: string) {
    let url = `${this.domain_name}/admin/certification-course/${course_code}/delete`;
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
    let url = `${this.domain_name}/certification-courses/${itemsCount}`;
    return <Observable<CertificationCourseItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(course_code: string) {
    let url = `${this.domain_name}/certification-course/${course_code}`;
    return <Observable<CertificationCourse>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
