import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import StudentProfile from '../interfaces/user-profile';
import { Courses, FetchCourseResponse } from '../interfaces/courses';
import BaseResponse from '../interfaces/base-response';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) { }
  
  csrfRequest() {
    let url = `http://localhost:8000/sanctum/csrf-cookie`;
    // let url = `https://mlaapi.mitiget.com/sanctum/csrf-cookie`;
    return this.httpClient.get(url, );
  }
  

  send_otp(email: string) {
    let data = new FormData();
    data.append('email', email);
    let url = `${this.domain_name}/student/send-otp`;
    return <Observable<LoginResponse>>this.httpClient.post(url, data);
  }

  resend_otp(type: string, email: string) {
    let url = `${this.domain_name}/login/resend-otp/${type}/${email}`;
    return <Observable<LoginResponse>>this.httpClient.post(url, null);
  }


  get_student(email: string) {
    let url = `${this.domain_name}/user/student/${email}`;
    return <Observable<{status: string; message?: string; student?: StudentProfile}>>this.httpClient.get(url); 
  }


  fetch_student_name(email: string) {
    let url = `${this.domain_name}/admin/fetch_student_name/${email}`;
    return <Observable<{status: string, message: string, name: string}>>this.httpClient.get(url); 
  }

  get_all() {
    let url = `${this.domain_name}/admin/students`;
    return <Observable<{students: {first_name: string; last_name: string; email: string}[]}>>this.httpClient.get(url);
  }

  fetch_enrolled_courses() {
    let url = `${this.domain_name}/student/courses`;

    return <Observable<{status: string, message: string, courses: Courses}>>this.httpClient.get(url);
  }

  fetch_enrolled_course(course: {identity: string, category?: string, enrollment_type: 'cohort' | 'individual'}) {
    let url = `${this.domain_name}/student/get_enrolled_course`;
    let form = new FormData();
    if (course.enrollment_type == 'individual') form.append('category', course.category);
    form.append('enrollment_type', course.enrollment_type);
    form.append('identity', course.identity);
    form.append('carted_or_enrolled', 'enrolled')



    return <Observable<FetchCourseResponse>>this.httpClient.post(url, form);
  }
}
