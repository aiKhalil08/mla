import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Courses, FetchCourseResponse } from '../interfaces/courses';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, @Inject('DOMAIN_NAME') private domain_name, private storageService: StorageService) { }


  cart_course(course: {identity: string, category: string}) {
    let url = `${this.domain_name}/student/cart`;
    let form = new FormData();
    form.append('category', course.category);

    if (course.category == 'certificate-course' || course.category == 'certification-course') {
      form.append('course_code', course.identity);
    } else if (course.category == 'offshore-course') {
      form.append('course_title', course.identity);
    }

    return <Observable<{status: string, message: string, cart: string[]}>>this.http.post(url, form);
  }

  remove_course(course: {identity: string, category: string}) {
    let url = `${this.domain_name}/student/remove-from-cart`;
    let form = new FormData();
    form.append('category', course.category);

    if (course.category == 'Certificate course' || course.category == 'Certification course') {
      form.append('course_code', course.identity);
    } else if (course.category == 'Offshore course') {
      form.append('course_title', course.identity);
    }

    return <Observable<{status: string, message: string, cart: string[]}>>this.http.post(url, form);
  }

  fetch_cart() {
    let url = `${this.domain_name}/student/cart`;

    return <Observable<{status: string, message: string, courses: Courses}>>this.http.get(url);
  }

  fetch_carted_course(course: {identity: string, category: string}) {
    let url = `${this.domain_name}/student/get_carted_course`;
    let form = new FormData();
    form.append('category', course.category);
    form.append('identity', course.identity);
    form.append('carted_or_enrolled', 'carted')


    return <Observable<FetchCourseResponse>>this.http.post(url, form);
  }

  set_cart(cart: any) {
    this.storageService.set('cart', cart);
  }


  get_cart() {
    if (!this.storageService.exists('cart')) return false;
    let encoded_cart = this.storageService.get('cart');
    return <{'certificate-courses': string[], 'certification-courses': string[], 'offshore-courses': string[]}>JSON.parse(atob(encoded_cart));
  }

  exists() {
    return this.storageService.exists('cart');
  }

  remove() {
    if (this.storageService.exists('cart')) this.storageService.remove('cart');
  }

  has(category: string, identity: string) {
    if (this.storageService.exists('cart')) {
      let category_array = <object[]>(this.get_cart())[category];
      if (category == 'certificate_courses' || category == 'certification_courses') {
        return category_array.some((course: {code: string}) => course.code == identity);
      } else return category_array.some((course: {title: string}) => course.title == identity);
    }
    return false;
  }
}
