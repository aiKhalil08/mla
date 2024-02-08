import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { CertificateCourseItem, CertificateCourse } from './interfaces/certificate-course';
import { CertificateCourseItem, CertificationCourseItem, OffshoreCourseItem } from './interfaces/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  // add(course: FormData) {
  //   // console.log(course);
  //   // let init_url = `http://localhost:8000/sanctum/csrf-cookie`;
  //   let url = `${this.domain_name}/certificate-course/create`;
  //   // this.http.get(init_url).subscribe((res) => {
  //   //   console.log(res);
  //   // });
  //   return this.http.post(url, course, {
  //     headers: new HttpHeaders({
  //       // 'Origin': 'http://localhost:4200',
  //       // 'somerandomheader': 'something'
  //     }),
  //   });
  // }
  // getList(itemsCount: number) {
  //   let url = `${this.domain_name}/certificate-courses/${itemsCount || 'all'}`;
  //   return <Observable<CertificateCourseItem[]>> this.http.get(url, {
  //     headers: new HttpHeaders({
  //       // 'Origin': 'http://localhost:4200',
  //       // 'somerandomheader': 'something'
  //     }),
  //   });
  // }
  get() {
    let url = `${this.domain_name}/courses`;
    return <Observable<{'certificate-courses': CertificateCourseItem[], "certification-courses": CertificationCourseItem[], "offshore-courses": OffshoreCourseItem[]}>>this.http.get(url, {
      headers: new HttpHeaders({
        // 'Origin': 'http://localhost:4200',
        // 'somerandomheader': 'something'
      }),
    });
  }
}
