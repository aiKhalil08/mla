import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial, TestimonialItem } from '../interfaces/testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(testimonial: FormData) {
    let url = `${this.domain_name}/admin/testimonial/create`;
    return this.http.post(url, testimonial, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  edit(testimonial: FormData, name: string) {
    let url = `${this.domain_name}/admin/testimonial/${name}/edit`;
    return this.http.post(url, testimonial, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  delete(name: string) {
    let url = `${this.domain_name}/admin/testimonial/${name}/delete`;
    return <Observable<{status: string}>>this.http.delete(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/testimonials/${itemsCount}`;
    return <Observable<TestimonialItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(name: string) {
    let url = `${this.domain_name}/testimonial/${name}`;
    return <Observable<Testimonial>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  // getPost(heading: string) {
  //   let url = `${this.domain_name}/blog/${heading}/post`;
  //   return <Observable<BlogPost>>this.http.get(url, {
  //     headers: new HttpHeaders({
  //       // 'Origin': 'http://localhost:4200',
  //       // 'somerandomheader': 'something'
  //     }),
  //   });
  // }
}
