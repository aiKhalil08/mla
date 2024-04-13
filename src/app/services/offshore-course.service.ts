import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetOffshoreCourseResponse, OffshoreCourse, OffshoreCourseItem } from '../interfaces/offshore-course';
import PostResponse from '../interfaces/post-response';

@Injectable({
  providedIn: 'root'
})
export class OffshoreCourseService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(course: FormData) {
    let url = `${this.domain_name}/admin/offshore-course/create`;
    
    return <Observable<PostResponse>>this.http.post(url, course);
  }

  edit(course: FormData, course_title: string) {
    let url = `${this.domain_name}/admin/offshore-course/${course_title}/edit`;
    
    return <Observable<PostResponse>>this.http.post(url, course);
  }

  delete(course_title: string) {
    let url = `${this.domain_name}/admin/offshore-course/${course_title}/delete`;
    
    return <Observable<PostResponse>>this.http.delete(url);
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/offshore-courses/${itemsCount}`;
    return <Observable<OffshoreCourseItem[]>> this.http.get(url);
  }
  get(course_title: string) {
    let url = `${this.domain_name}/offshore-course/${course_title}`;
    return <Observable<GetOffshoreCourseResponse>>this.http.get(url);
  }
}
