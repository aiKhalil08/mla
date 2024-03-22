import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }


  add_payout(form: FormData) {
    let url = `${this.domain_name}/student/payout`;
    return <Observable<{status: string, message?:string}>>this.http.post(url, form);
  }
}
