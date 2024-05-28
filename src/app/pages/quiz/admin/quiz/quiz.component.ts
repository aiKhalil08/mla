import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { format } from 'date-fns';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { PasswordConfirmationModalComponent } from "../../../../partials/password-confirmation-modal/password-confirmation-modal.component";
import { CommonModule } from '@angular/common';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-quiz',
    standalone: true,
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.css',
    imports: [PasswordConfirmationModalComponent, CommonModule, ReportBarComponent, EmptyContentComponent, RouterLink]
})
export class QuizComponent implements OnInit {

  quiz: Quiz;
  error: string = null;
  fetching: boolean;
  actions_folded: boolean = true;
  assignments_folded: boolean = true;

  confirm_action: boolean = false;
  pending_action: {funtion_name?: string, arguments?: any[]} = {funtion_name: null, arguments: null};

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit(): void {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('title')});
    this.fetchQuiz(name);
  }

  fetchQuiz(name: string) {
    this.fetching = true;
    this.quizService.get(name).subscribe({
      next: (response) => {
        this.fetching = false;
        // console.log(response)
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
    quiz?: Quiz;
  }) {
    this.quiz = response.quiz;
    this.error = null;

  }


  get date_created() {
    return format(this.quiz.date_created, 'do MMMM, yyyy');
  }

  // get assignments() {
  //   return this.quiz.assignments;
  // }



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

  delete(title: string) {
    this.action_in_progress = 'Deleting quiz...';
    this.quizService.delete(title).subscribe({
      next: (response) => {
        this.action_in_progress = null;

        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        }
        // this.action_done = response.message;
        this.navigator.navigate(['/quiz/admin/quizzes']);
        this.error_in_action = null;
      },
    });
  }
}
