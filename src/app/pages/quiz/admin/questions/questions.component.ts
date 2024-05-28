import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Question } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { PasswordConfirmationModalComponent } from "../../../../partials/password-confirmation-modal/password-confirmation-modal.component";
import { CommonModule } from '@angular/common';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";

@Component({
    selector: 'app-questions',
    standalone: true,
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.css',
    imports: [EmptyContentComponent, PasswordConfirmationModalComponent, CommonModule, RouterLink, ReportBarComponent]
})
export class QuestionsComponent implements OnInit {

  quiz_title: string;
  questions: Question[];
  error: string = null;
  fetching: boolean;
  actions_folded: boolean = true;
  assignments_folded: boolean = true;

  collapse_all: boolean = false;
  confirm_action: boolean = false;
  pending_action: {funtion_name?: string, arguments?: any[]} = {funtion_name: null, arguments: null};

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quiz_title = params['t'];
      
    });


    this.fetchQuizQuestions();
  }

  fetchQuizQuestions() {
    this.fetching = true;
    this.quizService.fetchQuestions(this.quiz_title).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.error = response.message;
          return;
        }
        this.handleResponse(response);
      }
    });
  }

  handleResponse(response: {
    status: string;
    message?: string;
    questions?: Question[];
  }) {
    this.questions = response.questions;
    this.error = null;

  }

  expandActionsBox(actions_box: HTMLDivElement, caret: HTMLSpanElement) {
    actions_box.classList.toggle('max-h-0');
    actions_box.classList.toggle('max-h-[150px]');
    caret.classList.toggle('-rotate-45');
    caret.classList.toggle('rotate-[135deg]');
    caret.classList.toggle('-translate-y-[2px]');
  }


  showConfirmationModal(action: string, args: any[] = []) {
    this.confirm_action = true;
    
    this.pending_action.funtion_name = action;
    this.pending_action.arguments = args;

    this.actions_folded = true;
  }

  proceedWithAction() {
    let function_name = this.pending_action.funtion_name;
    let args = this.pending_action.arguments;
    let fn: Function = this[function_name];

    fn.call(this, ...args);
    
    this.removeConfirmationModal();

  }

  removeConfirmationModal() {
    this.cancelConfirmation();
  }

  cancelConfirmation() {
    this.confirm_action = false;
    this.pending_action.funtion_name = null;
    this.pending_action.arguments = null;
  }

  delete(index: number) {
    this.action_in_progress = 'Deleting question...';
    let question = this.questions[index]
    this.quizService.deleteQuestion(this.quiz_title, question.id).subscribe({
      next: (response) => {
        this.action_in_progress = null;

        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        }
        
        this.action_done = response.message;
        this.error_in_action = null;
        this.questions.splice(index, 1);
      },
    });
  }

  encryptId(id: string) {
    return btoa(id);
  }
}
