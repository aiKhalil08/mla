import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import PostResponse from '../interfaces/base-response';
import { Admin } from '../interfaces/admin';
import { JWTService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient, private tokenService: JWTService) { }
  
  add(form: FormData) {
    let url = `${this.domain_name}/admin`;
    return <Observable<{status: string, message: string}>>this.httpClient.post(url, form);
  }


  delete(email: string) {
    let url = `${this.domain_name}/admin/${email}`;
    return <Observable<PostResponse>>this.httpClient.delete(url);
  }

  get(email: string) {
    let url = `${this.domain_name}/admin/${email}`;
    return <Observable<{status: string, message?: string, admin?: Admin}>>this.httpClient.get(url); 
  }

  getPermissions():string[] {
    return this.tokenService.payload().permissions;
  }

  hasPermission(name: string) {
    return this.getPermissions().includes(name);
  }

  getAllPermissions(email: string) {
    let url = `${this.domain_name}/admin/${email}/permissions`;
    return <Observable<{status: string, message?: string, permissions?: {id: number; name: string, admin_has: boolean}[]}>>this.httpClient.get(url); 
  }

  update(form: FormData, email: string) {
    let url = `${this.domain_name}/admin/${email}/update`;
    return <Observable<LoginResponse>>this.httpClient.post(url, form); 
  }

  updatePermissions(form: FormData, email: string) {
    let url = `${this.domain_name}/admin/${email}/permissions`;
    return <Observable<PostResponse>>this.httpClient.post(url, form);
  }

  get_all() {
    let url = `${this.domain_name}/admins`;
    return <Observable<{admins: {first_name: string; last_name: string; email: string}[]}>>this.httpClient.get(url);
  }
}
