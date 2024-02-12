import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event$, EventItem } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(event: FormData) {
    let url = `${this.domain_name}/event/create`;
    return this.http.post(url, event, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  edit(event: FormData, heading: string) {
    let url = `${this.domain_name}/event/${heading}/edit`;
    return this.http.post(url, event, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  delete(heading: string) {
    let url = `${this.domain_name}/event/${heading}/delete`;
    return <Observable<{status: string}>>this.http.delete(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
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
    return <Observable<Event$>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
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
