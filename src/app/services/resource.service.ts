import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogItem, TestimonialItem } from '../interfaces/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  get() {
    let url = `${this.domain_name}/resources`;
    return <Observable<{'blogs': BlogItem[], "testimonials"?: TestimonialItem[]}>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
