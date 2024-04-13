import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }


  upload(form: FormData, name: string, type: string) {

    let url = `${this.domain_name}/admin/certificates`;
    
    return <Observable<{status: string, message?: string}>>this.http.post(url, form);
  }

  download(path: string) {

    let url = `${this.domain_name}/student/download-certificate`;
    
    return <Observable<Blob>>this.http.get(url, {
      params: {path: path},
      responseType: 'blob',
    });
  }

  get(type: 'cohort_certificates' | 'individual_course_certificates', options: {
    cohort_name?: string;
    student_email: string;
    course_type?: string;
    course_identity?: string;
  }) {
    let url: string;
    let params = {};

    params['s'] = options.student_email;

    if (type == 'cohort_certificates') {
      url = `${this.domain_name}/certificate/cohort`;
      params['cn'] = options.cohort_name;
    }
    else if (type == 'individual_course_certificates') {
      url = `${this.domain_name}/certificate/individual-course`;
      params['ct'] = options.course_type;
      params['ci'] = options.course_identity;
    }
    
    return <Observable<{status: string, message?: string, certificate: {url: string}}>>this.http.get(url, {params: params});
  }

  get_my_certificates() {
    let url = `${this.domain_name}/student/certificates`;
    
    return <Observable<{status: string, message?: string, certificates: {name: string, url: string}[]}>>this.http.get(url);
  }
}
