import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CertificationCourse, CertificationCourseItem, GetCertificationCourseResponse } from '../interfaces/certification-course';
import { BrowserModule } from '@angular/platform-browser';
import PostResponse from '../interfaces/post-response';

@Injectable({
  providedIn: 'root'
})
export class CertificationCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    let url = `${this.domain_name}/admin/certification-course/create`;
    return <Observable<PostResponse>>this.http.post(url, course);
  }

  edit(course: FormData, course_code: string) {
    let url = `${this.domain_name}/admin/certification-course/${course_code}/edit`;
    

    return <Observable<PostResponse>>this.http.post(url, course);
  }

  delete(course_code: string) {
    let url = `${this.domain_name}/admin/certification-course/${course_code}/delete`;
    return <Observable<PostResponse>>this.http.delete(url);
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/certification-courses/${itemsCount}`;
    return <Observable<CertificationCourseItem[]>> this.http.get(url);
  }
  get(course_code: string) {
    let url = `${this.domain_name}/certification-course/${course_code}`;
    return <Observable<GetCertificationCourseResponse>>this.http.get(url);
  }
}
