import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PostResponse from '../interfaces/base-response';
import { SaleRecord, Sale } from '../interfaces/sales';
import { Fulfillment, FulfillmentItem } from '../interfaces/fulfillment';

@Injectable({
  providedIn: 'root'
})
export class FulfillmentService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) {}

  fulfill(form: FormData) {
    let url = `${this.domain_name}/admin/fulfillment`;
    return <Observable<PostResponse>>this.http.post(url, form);
  }

  get_all() {
    let url = `${this.domain_name}/admin/fulfillments`;
    return <Observable<{pending: FulfillmentItem[], history: FulfillmentItem[]}>>this.http.get(url);
  }

  get(id: number) {
    let url = `${this.domain_name}/admin/fulfillment/${id}`;
    return <Observable<{status: string, message?: string, fulfillment?: Fulfillment}>>this.http.get(url);
  }
}
