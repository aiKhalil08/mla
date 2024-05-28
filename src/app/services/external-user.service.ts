import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin';
import { JWTService } from './jwt.service';
import BaseResponse from '../interfaces/base-response';
import { ExternalUser } from '../interfaces/external-user';

@Injectable({
  providedIn: 'root'
})
export class ExternalUserService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient, private tokenService: JWTService) { }
  
  add(form: FormData) {
    let url = `${this.domain_name}/admin/external-user`;
    return <Observable<{status: string, message: string}>>this.httpClient.post(url, form);
  }


  delete(email: string) {
    let url = `${this.domain_name}/admin/external-user/${email}`;
    return <Observable<BaseResponse>>this.httpClient.delete(url);
  }

  get(email: string) {
    let url = `${this.domain_name}/admin/external-user/${email}`;
    return <Observable<BaseResponse & {user: ExternalUser}>>this.httpClient.get(url); 
  }

  update(form: FormData, email: string) {
    let url = `${this.domain_name}/admin/external-user/${email}/edit`;
    return <Observable<BaseResponse>>this.httpClient.post(url, form); 
  }

  getAll() {
    let url = `${this.domain_name}/admin/external-users`;
    return <Observable<{users: {first_name: string; last_name: string; email: string, company: {name: string}}[]}>>this.httpClient.get(url);
  }
}
