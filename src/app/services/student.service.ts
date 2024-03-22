import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import StudentProfile from '../interfaces/student-profile';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) { }

  csrfRequest() {
    // let url = `http:///sanctum/csrf-cookie`;
    let url = `https://mlaapi.mitiget.com/sanctum/csrf-cookie`;
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

  update_profile(form: FormData) {
    let url = `${this.domain_name}/student/profile`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form); 
  }

  fetch_student_name(email: string) {
    let url = `${this.domain_name}/admin/fetch_student_name/${email}`;
    return <Observable<{status: string, message: string, name: string}>>this.httpClient.get(url); 
  }
}
