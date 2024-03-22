import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PostResponse from '../interfaces/post-response';
import { Sale, SaleRecord } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) {}

  add(sale: FormData) {
    let url = `${this.domain_name}/admin/sale`;
    return <Observable<PostResponse>>this.http.post(url, sale);
  }

  get_all() {
    let url = `${this.domain_name}/admin/sales`;
    return <Observable<{sales: SaleRecord[]}>>this.http.get(url);
  }

  get(id: number) {
    let url = `${this.domain_name}/admin/sale/${id}`;
    return <Observable<{status: string, message?: string, sale?: Sale}>>this.http.get(url);
  }
}
