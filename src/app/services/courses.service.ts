import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { CertificateCourseItem, CertificateCourse } from './interfaces/certificate-course';
import { CertificateCourseItem, CertificationCourseItem, OffshoreCourseItem } from '../interfaces/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  get() {
    let url = `${this.domain_name}/courses`;
    return <Observable<{'certificate-courses': CertificateCourseItem[], "certification-courses": CertificationCourseItem[], "offshore-courses": OffshoreCourseItem[]}>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
