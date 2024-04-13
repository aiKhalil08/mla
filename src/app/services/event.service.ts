import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event$, EventItem, GetEventResponse } from '../interfaces/event';
import PostResponse from '../interfaces/post-response';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(event: FormData) {
    let url = `${this.domain_name}/admin/event/create`;
    return <Observable<PostResponse>>this.http.post(url, event);
  }

  edit(event: FormData, heading: string) {
    let url = `${this.domain_name}/admin/event/${heading}/edit`;
    return <Observable<PostResponse>>this.http.post(url, event);
  }

  delete(heading: string) {
    let url = `${this.domain_name}/admin/event/${heading}/delete`;
    return <Observable<PostResponse>>this.http.delete(url);
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

  // getEvent(heading: string) {
  //   let url = `${this.domain_name}/event/${heading}/post`;
  //   return <Observable<BlogPost>>this.http.get(url, {
  //     headers: new HttpHeaders({
  //       // 'Origin': 'http://localhost:4200',
  //       // 'somerandomheader': 'something'
  //     }),
  //   });
  // }
}
