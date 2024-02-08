import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CertificateCourse, CertificateCourseItem } from './interfaces/certificate-course';

@Injectable({
  providedIn: 'root'
})
export class CertificateCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/certificate-course/create`;
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

  edit(course: FormData, course_code: string) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/certificate-course/${course_code}/edit`;
    // console.log(course.get('image'));
    // console.log(course.get('sch'));

    console.log(course.get('code'))
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

  delete(course_code: string) {
    // console.log(course);
    // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
    let url = `${this.domain_name}/certificate-course/${course_code}/delete`;
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
    let url = `${this.domain_name}/certificate-courses/${itemsCount}`;
    return <Observable<CertificateCourseItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(course_code: string) {
    let url = `${this.domain_name}/certificate-course/${course_code}`;
    return <Observable<CertificateCourse>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
