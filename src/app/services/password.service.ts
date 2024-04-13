import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  confirm(form: FormData, type: string) {
    let url: string;
    if (type == 'admin') url = `${this.domain_name}/admin/confirm-password`;
    else url = `${this.domain_name}/student/confirm-password`;
    
    return <Observable<{status: 'success' | 'failed'}>>this.http.post(url, form);
  }
}
