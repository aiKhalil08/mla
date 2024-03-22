import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CertificateCourse, CertificateCourseItem } from '../interfaces/certificate-course';

@Injectable({
  providedIn: 'root'
})
export class CertificateCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    let url = `${this.domain_name}/admin/certificate-course/create`;
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
    return this.http.post(url, course,);
  }

  edit(course: FormData, course_code: string) {
    let url = `${this.domain_name}/admin/certificate-course/${course_code}/edit`;
    // console.log(course.get('image'));
    // console.log(course.get('sch'));

    console.log(course.get('code'))
    // this.http.get(init_url).subscribe((res) => {
    //   console.log(res);
    // });
    return this.http.post(url, course,);
  }

  delete(course_code: string) {
    let url = `${this.domain_name}/admin/certificate-course/${course_code}/delete`;
    return <Observable<{status: string}>>this.http.delete(url, {});
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
