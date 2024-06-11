import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import BaseResponse from '../interfaces/base-response';
import UserProfile from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) { }
  
  csrfRequest() {
    let url = `http://localhost:8000/sanctum/csrf-cookie`;
    // let url = `https://mlaapi.mitiget.com/sanctum/csrf-cookie`;
    return this.httpClient.get(url, );
  }
  
  add(form: FormData) {
    let url = `${this.domain_name}/user`;
    return this.csrfRequest().pipe(
      map((res) => {
        return <Observable<{status: string, message: string}>>this.httpClient.post(url, form, {});
      })
    );
  }


  verifyEmail(form: FormData,) {
    let url = `${this.domain_name}/user/verify-email`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form); 
  }


  delete(email: string) {
    let url = `${this.domain_name}/user/${email}`;
    return <Observable<BaseResponse>>this.httpClient.delete(url);
  }

  resendOTP(email: string) {
    let url = `${this.domain_name}/login/resend-otp/${email}`;
    return <Observable<LoginResponse>>this.httpClient.post(url, null);
  }

  get_profile() {
    let url = `${this.domain_name}/user/profile`;
    return <Observable<{profile: UserProfile}>>this.httpClient.get(url); 
  }

  update_profile(form: FormData) {
    let url = `${this.domain_name}/user/profile`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form); 
  }

  makeOrRevoke(role_name: string, form: FormData) {
    let url = `${this.domain_name}/user/make-or-revoke/${role_name}`;
    return <Observable<BaseResponse>>this.httpClient.post(url, form); 
  }

  getAll() {
    let url = `${this.domain_name}/admin/users`;
    return <Observable<{users: {first_name: string; last_name: string; email: string, roles: string[]}[]}>>this.httpClient.get(url);
  }

  getUserProfile(email: string) {
    let url = `${this.domain_name}/admin/user/${email}`;
    return <Observable<{status: string; message?: string; user?: UserProfile}>>this.httpClient.get(url); 
  }

  confirmPassword(form: FormData) {
    let url = `${this.domain_name}/user/confirm-password`;
    
    return <Observable<{status: 'success' | 'failed'}>>this.httpClient.post(url, form);
  }
}
