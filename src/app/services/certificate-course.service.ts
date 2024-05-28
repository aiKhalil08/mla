import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CertificateCourse, CertificateCourseItem, GetCertificateCourseResponse } from '../interfaces/certificate-course';
import PostResponse from '../interfaces/base-response';

@Injectable({
  providedIn: 'root'
})
export class CertificateCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    let url = `${this.domain_name}/admin/certificate-course/create`;
    
    return <Observable<PostResponse>>this.http.post(url, course,);
  }

  edit(course: FormData, course_code: string) {
    let url = `${this.domain_name}/admin/certificate-course/${course_code}/edit`;
    
    return <Observable<PostResponse>>this.http.post(url, course,);
  }

  delete(course_code: string) {
    let url = `${this.domain_name}/admin/certificate-course/${course_code}/delete`;
    return <Observable<PostResponse>>this.http.delete(url, {});
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/certificate-courses/${itemsCount}`;
    return <Observable<CertificateCourseItem[]>> this.http.get(url);
  }
  get(course_code: string) {
    let url = `${this.domain_name}/certificate-course/${course_code}`;
    return <Observable<GetCertificateCourseResponse>>this.http.get(url);
  }
}
