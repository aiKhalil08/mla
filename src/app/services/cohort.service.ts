import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cohort, CohortItem, EditableCohort } from '../interfaces/cohort';
import BaseResponse from '../interfaces/base-response';

@Injectable({
  providedIn: 'root'
})
export class 
CohortService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private http: HttpClient) { }

  create(form: FormData) {
    let url = `${this.domain_name}/admin/cohort`;
    
    return <Observable<BaseResponse>>this.http.post(url, form);
  }

  getList() {
    let url = `${this.domain_name}/admin/cohorts`;
    return <Observable<{cohorts: CohortItem[]}>> this.http.get(url);
  }

  fetch_cohort_for_edit(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/edit`;
    return <Observable<{status: string, message?: string, cohort?: EditableCohort}>> this.http.get(url);
  }

  edit(form: FormData, name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/edit`;
    return <Observable<{status: string, message?: string}>> this.http.post(url, form);
  }

  get(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}`;
    return <Observable<{status: string, message?: string, cohort?: Cohort}>> this.http.get(url);
  }

  get_cohort_names() {
    let url = `${this.domain_name}/admin/cohorts/for-sale`;
    return <Observable<{cohorts: CohortItem[]}>>this.http.get(url);
  }

  get_all_students(name: string) { // get all students indicating those who have registered for cohort
    let url = `${this.domain_name}/admin/cohort/${name}/students`;
    return <Observable<{status: string, message?: string, students: {first_name: string, last_name: string; email: string, id: number, registration_status: '0' | '1'}[]}>> this.http.get(url);
  }

  add_students(form: FormData, name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/students`;
    
    return <Observable<{status: string, message?: string}>>this.http.post(url, form);
  }


  notify_students(form: FormData, name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/notify-students`;
    
    return <Observable<{status: string, message?: string}>>this.http.post(url, form);
  }


  start(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/start`;
    return <Observable<{status: string, start_date?: string; message?: string}>> this.http.get(url);
  }

  conclude(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/conclude`;
    return <Observable<{status: string, end_date?: string, message?: string}>> this.http.get(url);
  }

  abort(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/abort`;
    return <Observable<{status: string, message?: string}>> this.http.get(url);
  }

  delete(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/delete`;
    return <Observable<{status: string, message?: string}>> this.http.get(url);
  }

  get_students_certificates(name: string) {
    let url = `${this.domain_name}/admin/cohort/${name}/certificates`;
    return <Observable<{status: string, message?: string, students: {first_name: string, last_name: string; email: string, certificate: {url?: string}}[]}>> this.http.get(url);
  }

  
}
