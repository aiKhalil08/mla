import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseResponse from '../interfaces/base-response';
import { Assignment, AssignmentItem, AttemptSummary, HistoryItem, Session } from '../interfaces/assignment';
import { Question, Response } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) { }

  add(form: FormData) {
    let url = `${this.domain_name}/admin/assignment`;
    return <Observable<BaseResponse>> this.httpClient.post(url, form);
  }

  get(name: string) {
    let url = `${this.domain_name}/admin/assignment/${name}`;
    return <Observable<BaseResponse & {assignment?: Assignment}>> this.httpClient.get(url);
  }

  getAll() {
    let url = `${this.domain_name}/admin/assignments`;
    return <Observable<{assignments: AssignmentItem[]}>> this.httpClient.get(url);
  }

  edit(form: FormData, name: string) {
    let url = `${this.domain_name}/admin/assignment/${name}/edit`;
    return <Observable<{status: string, message?: string}>> this.httpClient.post(url, form);
  }

  delete(name: string) {
    let url = `${this.domain_name}/admin/assignment/${name}`;
    return <Observable<BaseResponse>>this.httpClient.delete(url);
  }

  getAllStudents(name: string) { // gets all students indicating those who have been assigned to assignment
    let url = `${this.domain_name}/admin/assignment/${name}/all-students`;
    return <Observable<{status: string, message?: string, students?: {first_name: string, last_name: string; email: string, company: {name: string}, id: number, is_assigned: boolean}[]}>> this.httpClient.get(url);
  }

  updateStudents(form: FormData, name: string) {
    let url = `${this.domain_name}/admin/assignment/${name}/students`;
    return <Observable<{status: string, message?: string}>> this.httpClient.post(url, form);
  }
  

  getStudents(name: string) { // gets all assignments for the specified quiz
    let url = `${this.domain_name}/admin/assignment/${name}/students`;
    return <Observable<{status: string, message?: string, students?: {first_name: string, last_name: string; email: string, company: {name: string}, id: number}[]}>> this.httpClient.get(url);
  }

  notifyStudents(form: FormData, name: string) {
    let url = `${this.domain_name}/admin/assignment/${name}/notify-students`;
    
    return <Observable<{status: string, message?: string}>>this.httpClient.post(url, form);
  }

  changeStatus(name: string, new_status: 'start' | 'conclude') {
    let url = `${this.domain_name}/admin/assignment/${name}/${new_status}`;
    return <Observable<{status: string, start_date?: string; end_date?: string, message?: string}>> this.httpClient.get(url);
  }

  // methods for students assigned to quizzes

  getPendingAssignments() {
    let url = `${this.domain_name}/assignments/pending`;
    return <Observable<{assignments: AssignmentItem[]}>> this.httpClient.get(url);
  }

  getCompletedAssignments() {
    let url = `${this.domain_name}/assignments/completed`;
    return <Observable<{assignments: HistoryItem[]}>> this.httpClient.get(url);
  }

  getAssignment(name: string) {
    let url = `${this.domain_name}/assignment/${name}`;
    return <Observable<BaseResponse & {assignment: Assignment}>> this.httpClient.get(url);
  }

  getAssignmentQuestions(name: string) {
    let url = `${this.domain_name}/assignment/${name}/questions`;
    return <Observable<BaseResponse & {session?: Session}>> this.httpClient.get(url);
  }

  submitAssignment(form: any, name: string) {
    let url = `${this.domain_name}/assignment/${name}/submit`;
    return <Observable<BaseResponse & {attempt_summary?: AttemptSummary}>> this.httpClient.post(url, form);
  }

  getAssignmentReview(name: string) {
    let url = `${this.domain_name}/assignment/${name}/review`;
    return <Observable<BaseResponse & {questions: Question[], responses: Response[]}>> this.httpClient.get(url);
  }
}