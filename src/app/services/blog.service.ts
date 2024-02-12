import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogItem, Blog, BlogPost } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  add(blog: FormData) {
    let url = `${this.domain_name}/blog/create`;
    return this.http.post(url, blog, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  edit(blog: FormData, heading: string) {
    let url = `${this.domain_name}/blog/${heading}/edit`;
    return this.http.post(url, blog, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  delete(heading: string) {
    let url = `${this.domain_name}/blog/${heading}/delete`;
    return <Observable<{status: string}>>this.http.delete(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/blogs/${itemsCount}`;
    return <Observable<BlogItem[]>> this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
  get(heading: string) {
    let url = `${this.domain_name}/blog/${heading}`;
    return <Observable<Blog>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }

  getPost(heading: string) {
    let url = `${this.domain_name}/blog/${heading}/post`;
    return <Observable<BlogPost>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
