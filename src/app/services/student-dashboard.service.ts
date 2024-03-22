import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDashboard } from '../interfaces/admin-dashboard';
import { JWTService } from './jwt.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient, private token: JWTService) { }

  get() {
    let token = this.token.get()
    // let payload = JSON.parse(atob(token.split('.')[1]));
    // console.log(this.token.payload(), (moment().unix() - this.token.payload().exp)/60, (Date.now()/1000 - this.token.payload().exp)/60);
    // this.token.rightIssuer('student');
    // console.log(this.token.isExpired())
    let url = `${this.domain_name}/test-auth`;
    // {message: string, user: any}
    return <Observable<any>>this.http.get(url,);
  }
}
