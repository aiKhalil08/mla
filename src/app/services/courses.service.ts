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
    let url = `${this.domain_name}/admin/courses`;
    return <Observable<{'certificate-courses': CertificateCourseItem[], "certification-courses": CertificationCourseItem[], "offshore-courses": OffshoreCourseItem[]}>>this.http.get(url);
  }

  get_course_names(type: string) {
    let url = `${this.domain_name}/${type.replace(' ', '-').toLowerCase()}/names`;
    return <Observable<{code?: string; title: string}[]>>this.http.get(url);
  }

  get_trending_courses() {
    let url = `${this.domain_name}/student/trending-courses`;
    return <Observable<{courses: {name: {title: string, code?: string}, type: string}[]}>>this.http.get(url);
  }

  get_enrolled_students(type: string, course_identity: string) {
    let url = `${this.domain_name}/${type.toLowerCase().replace(' ', '_')}/enrolled-students/${course_identity}`;
    return <Observable<{status: string, message?: string, students: {first_name: string, last_name: string; email: string, certificate: {url?: string}}[]}>>this.http.get(url);
  }
}
