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

  // methods for quiz questions management

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
