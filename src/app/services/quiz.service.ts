import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseResponse from '../interfaces/base-response';
import { Question, Quiz, QuizItem } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) { }
  
  create(form: FormData) {
    let url = `${this.domain_name}/admin/quiz`;
    
    return <Observable<BaseResponse>>this.httpClient.post(url, form);
  }

  get(title: string) {
    let url = `${this.domain_name}/admin/quiz/${title}`;
    return <Observable<{status: string, message?: string, quiz?: Quiz}>> this.httpClient.get(url);
  }

  getAllStudents(title: string) { // gets all students indicating those who have been assigned to quiz
    let url = `${this.domain_name}/admin/quiz/${title}/all-students`;
    return <Observable<{status: string, message?: string, students?: {first_name: string, last_name: string; email: string, company: {name: string}, id: number, is_assigned: boolean}[]}>> this.httpClient.get(url);
  }

  getAssignments(title: string) {
    let url = `${this.domain_name}/admin/quiz/${title}/assignments`;
    return <Observable<{status: string, message?: string, assignments?: {first_name: string, last_name: string; email: string, company: {name: string}, id: number}[]}>> this.httpClient.get(url);
  }

  notify(form: FormData, title: string) {
    let url = `${this.domain_name}/admin/quiz/${title}/notify`;
    
    return <Observable<{status: string, message?: string}>>this.httpClient.post(url, form);
  }

  getAll() {
    let url = `${this.domain_name}/admin/quizzes`;
    return <Observable<{quizzes: QuizItem[]}>> this.httpClient.get(url);
  }

  fetchQuestions(title: string) {
    let url = `${this.domain_name}/admin/quiz/${title}/questions`;
    return <Observable<{status: string, message?: string, questions?: Question[]}>> this.httpClient.get(url);
  }

  edit(form: FormData, title: string) {
    let url = `${this.domain_name}/admin/quiz/${title}/edit`;
    return <Observable<{status: string, message?: string}>> this.httpClient.post(url, form);
  }

  delete(email: string) {
    let url = `${this.domain_name}/admin/quiz/${email}`;
    return <Observable<BaseResponse>>this.httpClient.delete(url);
  }

  updateAssignments(form: FormData, title: string) {
    let url = `${this.domain_name}/admin/quiz/${title}/assignments`;
    return <Observable<{status: string, message?: string}>> this.httpClient.post(url, form);
  }

  getAssignedQuizzes() {
    let url = `${this.domain_name}/quiz/all`;
    return <Observable<{quizzes: Quiz[]}>> this.httpClient.get(url);
  }

  // method for quiz questions management

  addQuestion(form: FormData, quiz_title: string) {
    let url = `${this.domain_name}/admin/quiz/${quiz_title}/add-question`;
    
    return <Observable<BaseResponse>>this.httpClient.post(url, form);
  }

  editQuestion(form: FormData, quiz_title: string, question_id: string) {
    let url = `${this.domain_name}/admin/quiz/${quiz_title}/edit-question/${question_id}`;
    
    return <Observable<BaseResponse>>this.httpClient.post(url, form);
  }

  deleteQuestion(quiz_title: string, question_id: string) {
    let url = `${this.domain_name}/admin/quiz/${quiz_title}/delete-question/${question_id}`;
    
    return <Observable<BaseResponse>>this.httpClient.delete(url);
  }

  getQuestion(quiz_title: string, question_id: string) {
    let url = `${this.domain_name}/admin/quiz/${quiz_title}/get-question/${question_id}`;
    
    return <Observable<BaseResponse & {question?: Question}>>this.httpClient.get(url);
  }
}
