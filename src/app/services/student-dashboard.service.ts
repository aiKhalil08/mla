import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient, private token: JWTService) { }

  get() {
    // let token = this.token.get()
    let url = `${this.domain_name}/test-auth`;
    // {message: string, user: any}
    return <Observable<any>>this.http.get(url,);
  }
}
