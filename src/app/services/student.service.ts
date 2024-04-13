import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import StudentProfile from '../interfaces/student-profile';
import { Courses, FetchCourseResponse } from '../interfaces/courses';

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

  add(form: FormData) {
    let url = `${this.domain_name}/student`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form, {});
      })
    );
  }

  // add(form: FormData) {
  //   let url = `${this.domain_name}/student`;
  //   return <Observable<{status: string, message: string}>>this.httpClient.post(url, form, {});
  // }

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

  confirm_email(form: FormData,) {
    let url = `${this.domain_name}/student/confirm-email`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form); 
  }

  get_profile() {
    let url = `${this.domain_name}/student/profile`;
    return <Observable<{profile: StudentProfile}>>this.httpClient.get(url); 
  }

  get_user(email: string) {
    let url = `${this.domain_name}/admin/user/${email}`;
    return <Observable<{status: string; message?: string; user?: StudentProfile}>>this.httpClient.get(url); 
  }

  update_profile(form: FormData) {
    let url = `${this.domain_name}/student/profile`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form); 
  }

  fetch_student_name(email: string) {
    let url = `${this.domain_name}/admin/fetch_student_name/${email}`;
    return <Observable<{status: string, message: string, name: string}>>this.httpClient.get(url); 
  }

  get_all() {
    let url = `${this.domain_name}/admin/users`;
    return <Observable<{students: {first_name: string; last_name: string; email: string}[]}>>this.httpClient.get(url);
  }

  fetch_enrolled_courses() {
    let url = `${this.domain_name}/student/courses`;

    return <Observable<{courses: Courses}>>this.httpClient.get(url);
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
