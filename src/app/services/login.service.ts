import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  result: Observable<any>;

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) { }

  csrfRequest() {
    let url = `http://localhost:8000/sanctum/csrf-cookie`;
    // let url = `https://mlaapi.mitiget.com/sanctum/csrf-cookie`;
    return this.httpClient.get(url, );
  }

  admin_login(form: FormData) {
    let url = `${this.domain_name}/login/admin`;
    return this.csrfRequest().pipe(
      map((res) => {
        return this.httpClient.post<LoginResponse>(url, form,);
      })
    );
  }

  login_one(form: FormData, type: string) {
    let url = `${this.domain_name}/login1/${type}`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form,);
      })
    );
  }

  login_two(form: FormData, type: string) {
    let url = `${this.domain_name}/login2/${type}`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form,);
  }

  resend_otp(type: string, email: string) {
    let url = `${this.domain_name}/login/resend-otp/${type}/${email}`;
    return <Observable<LoginResponse>>this.httpClient.post(url, null);
  }


  send_password_reset_link(form: FormData, type: string) {
    let url = `${this.domain_name}/send_password_reset_link/${type}`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form,);
      })
    );
  }

  validate_link(email: string, token: string, type: string) {
    let form = new FormData;
    form.append('email', email);
    form.append('token', token);
    form.append('type', type);
    let url = `${this.domain_name}/validate_link`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form,);
      })
    );
  }

  reset_password(form: FormData, email: string, type: string) {
    form.append('email', email);
    form.append('type', type);

    let url = `${this.domain_name}/reset_password`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form);
  }
}
