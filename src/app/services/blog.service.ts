import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogItem, Blog, BlogPost } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) {}

  add(blog: FormData) {
    let url = `${this.domain_name}/admin/blog/create`;
    return this.http.post(url, blog);
  }

  edit(blog: FormData, heading: string) {
    let url = `${this.domain_name}/admin/blog/${heading}/edit`;
    return this.http.post(url, blog);
  }

  delete(heading: string) {
    let url = `${this.domain_name}/admin/blog/${heading}/delete`;
    return <Observable<{status: string}>>this.http.delete(url);
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/blogs/${itemsCount}`;
    return <Observable<BlogItem[]>> this.http.get(url);
  }
  get(heading: string) {
    let url = `${this.domain_name}/blog/${heading}`;
    return <Observable<Blog>>this.http.get(url);
  }

  getPost(heading: string) {
    let url = `${this.domain_name}/blog/${heading}/post`;
    return <Observable<BlogPost>>this.http.get(url);
  }
}
