import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTestimonialResponse, Testimonial, TestimonialItem } from '../interfaces/testimonial';
import PostResponse from '../interfaces/post-response';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(testimonial: FormData) {
    let url = `${this.domain_name}/admin/testimonial/create`;
    return <Observable<PostResponse>>this.http.post(url, testimonial);
  }

  edit(testimonial: FormData, name: string) {
    let url = `${this.domain_name}/admin/testimonial/${name}/edit`;
    return <Observable<PostResponse>>this.http.post(url, testimonial,);
  }

  delete(name: string) {
    let url = `${this.domain_name}/admin/testimonial/${name}/delete`;
    return <Observable<PostResponse>>this.http.delete(url);
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
    return <Observable<GetTestimonialResponse>>this.http.get(url);
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
