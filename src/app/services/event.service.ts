import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventItem, GetEventResponse, Registration } from '../interfaces/event';
import BaseResponse from '../interfaces/base-response';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(event: FormData) {
    let url = `${this.domain_name}/admin/event/create`;
    return <Observable<BaseResponse>>this.http.post(url, event);
  }

  edit(event: FormData, heading: string) {
    let url = `${this.domain_name}/admin/event/${heading}/edit`;
    return <Observable<BaseResponse>>this.http.post(url, event);
  }

  delete(heading: string) {
    let url = `${this.domain_name}/admin/event/${heading}/delete`;
    return <Observable<BaseResponse>>this.http.delete(url);
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/events/${itemsCount}`;
    return <Observable<EventItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(heading: string) {
    let url = `${this.domain_name}/event/${heading}`;
    return <Observable<GetEventResponse>>this.http.get(url);
  }

  register(form: FormData, event_name: string) {
    let url = `${this.domain_name}/event/${event_name}/register`;
    return <Observable<BaseResponse>>this.http.post(url, form);
  }

  getRegistrations(event_name: string) {
    let url = `${this.domain_name}/event/${event_name}/registrations`;
    return <Observable<{status: string, message?: string, event_name?: string, registrants?: Registration[]}>>this.http.get(url);
  }

  getRegistration(registration_id: string) {
    let url = `${this.domain_name}/event/registration/${registration_id}`;
    return <Observable<{status: string, message?: string, registration?: Registration & {message?: string}}>>this.http.get(url);
  }
}
