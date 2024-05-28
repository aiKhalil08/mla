import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import { AuthResponse } from '../interfaces/auth-response';

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

  login_one(form: FormData) {
    let url = `${this.domain_name}/login1`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<AuthResponse>>this.httpClient.post(url, form,);
      })
    );
  }

  login_two(form: FormData) {
    let url = `${this.domain_name}/login2`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form,);
  }

  resend_otp(email: string) {
    let url = `${this.domain_name}/login/resend-otp/${email}`;
    return <Observable<LoginResponse>>this.httpClient.post(url, null);
  }


  send_password_reset_link(form: FormData) {
    let url = `${this.domain_name}/send_password_reset_link`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form,);
      })
    );
  }

  validate_link(email: string, token: string) {
    let form = new FormData;
    form.append('email', email);
    form.append('token', token);
    let url = `${this.domain_name}/validate_link`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form,);
      })
    );
  }

  reset_password(form: FormData, email: string) {
    form.append('email', email);

    let url = `${this.domain_name}/reset_password`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form);
  }
}
