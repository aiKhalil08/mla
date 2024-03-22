import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request$, RequestItem } from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient, @Inject('DOMAIN_NAME') private domain_name) { }

  post(request: FormData) {
    let url = `${this.domain_name}/request/create`;
    return <Observable<Request$>>this.httpClient.post(url, request);
  }

  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/admin/requests/${itemsCount}`;
    return <Observable<RequestItem[]>> this.httpClient.get(url);
  }
  get(last_name: string, created_at: string) {
    let url = `${this.domain_name}/admin/request/${last_name}/${created_at}`;
    return <Observable<Request$>>this.httpClient.get(url);
  }
}
