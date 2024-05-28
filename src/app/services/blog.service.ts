import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogItem, Blog, BlogPost, GetBlogPostResponse, GetBlogResponse } from '../interfaces/blog';
import PostResponse from '../interfaces/base-response';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) {}

  add(blog: FormData) {
    let url = `${this.domain_name}/admin/blog/create`;
    return <Observable<PostResponse>>this.http.post(url, blog);
  }

  edit(blog: FormData, heading: string) {
    let url = `${this.domain_name}/admin/blog/${heading}/edit`;
    return <Observable<PostResponse>>this.http.post(url, blog);
  }

  delete(heading: string) {
    let url = `${this.domain_name}/admin/blog/${heading}/delete`;
    return <Observable<PostResponse>>this.http.delete(url);
  }
  getList(itemsCount: number | 'all') {
    let url = `${this.domain_name}/blogs/${itemsCount}`;
    return <Observable<BlogItem[]>> this.http.get(url);
  }
  get(heading: string) {
    let url = `${this.domain_name}/blog/${heading}`;
    return <Observable<GetBlogResponse>>this.http.get(url);
  }

  getPost(heading: string) {
    let url = `${this.domain_name}/blog/${heading}/post`;
    return <Observable<GetBlogPostResponse>>this.http.get(url);
  }
}
