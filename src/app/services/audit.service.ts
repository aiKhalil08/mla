import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginResponse from '../interfaces/login-response';
import PostResponse from '../interfaces/base-response';
import { Admin } from '../interfaces/admin';
import { JWTService } from './jwt.service';
import { AuditTrail } from '../interfaces/audit-trail';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  
  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient, private tokenService: JWTService) { }

  fetchAuditTrails() {
    let url = `${this.domain_name}/admin/audit-trails`;
    return <Observable<{trails: AuditTrail[]}>>this.httpClient.get(url); 
  }

  fetchTrail(id: string) {
    let url = `${this.domain_name}/admin/audit-trail/${id}`;
    return <Observable<{status: string, message?: string, object?: object, actor?: {first_name: string, last_name: string}, date?: string, actino?: string, object_name: string;}>>this.httpClient.get(url); 
  }
}
