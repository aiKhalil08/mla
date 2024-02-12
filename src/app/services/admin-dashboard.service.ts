import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDashboard } from '../interfaces/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  get() {
    let url = `${this.domain_name}/admin-dashboard`;
    return <Observable<AdminDashboard>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
