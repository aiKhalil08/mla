import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Timer from 'easytimer.js';
import BaseResponse from 'src/app/interfaces/base-response';
import { Question } from 'src/app/interfaces/quiz';
import { AssignmentService } from 'src/app/services/assignment.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmProceedModalComponent } from "../../../../partials/confirm-proceed-modal/confirm-proceed-modal.component";
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { AttemptSummary, Session } from 'src/app/interfaces/assignment';

@Component({
    selector: 'app-take-assignment',
    standalone: true,
    templateUrl: './take-assignment.component.html',
    styleUrl: './take-assignment.component.css',
    imports: [CommonModule, ConfirmProceedModalComponent, ReactiveFormsModule, EmptyContentComponent, RouterLink]
})
export class TakeAssignmentComponent implements OnInit {
  fetch_status: 'fetching' | 'fetched'; 
  submit_status: 'submitting' | 'submitted';
  empty: string = null;

  questions: Question[];
  duration: number;
  shuffle: {questions: 'true' | 'false', options: 'true' | 'false'};
  current_question_id: number = 0;
  assignment_name: string;
  questions_group: FormGroup;
  flicker_added: boolean = false;

  remaining_time: string;
  danger_zone = 5; // when the timer is below this value, the timer box starts to flicker.

  attempt_summary: AttemptSummary = {points_obtained: null, points_obtainable: null, correct_answers: null, time_taken: null }

  @ViewChild('form', {static: false}) form: ElementRef;
  @ViewChild('time_box', {static: false}) time_box: ElementRef;
  show_confirm_submit_modal: boolean;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private fb: FormBuilder, private storageService: StorageService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assignment_name = params['name'];
      this.fetchQuiz();
    })
  }

  fetchQuiz() {
    this.fetch_status = 'fetching';
    this.assignmentService.getAssignmentQuestions(this.assignment_name).subscribe({
      next: (response) => {
        this.fetch_status = 'fetched';
        if (response.status == 'empty') {
          this.empty = response.message;
          return;
        }
        this.handleFetchQuestionsResponse(response);
      }
   });
  }

  handleFetchQuestionsResponse(response: BaseResponse & {session?: Session}) { // start the quiz
    this.questions = response.session.questions;
    this.duration = response.session.duration;
    this.shuffle = response.session.shuffle;

    if (this.shuffle.questions == 'true') this.questions = this.shuffleArray(response.session.questions);
    if (this.shuffle.options == 'true') this.questions.forEach(question => question.options = this.shuffleArray(question.options));
    this.clearAllResponsesFromStorage();
    this.storageService.set('quiz_session_active', '1');

    let controls: object = {};

    this.questions.forEach(question => controls[question.id] = this.fb.control(''));

    for (let key in controls) {
      let control = controls[key] as FormControl;
      control.valueChanges.subscribe(value => this.storeResponseInLocalStorage(key, value))
    }

    this.questions_group = this.fb.group({
      responses: this.fb.group(controls),
    });

    // window.onclick = () => {alert('hi')}

    // window.addEventListener('beforeunload', function(e) {
    //   e.preventDefault();
    //   e.returnValue = 'sa';
    //   // alert('you sure you want to leave')
    // })
    this.startCountdown();

  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  get fetching() {return this.fetch_status == 'fetching'}
  get fetched() {return this.fetch_status == 'fetched'}
  get submitting() {return this.submit_status == 'submitting'}
  get submitted() {return this.submit_status == 'submitted'}

  get responses() {
    return this.questions_group.get('responses');
  }

  private storeResponseInLocalStorage(question_id: string, option_id: string) {
    this.storageService.set('q'+question_id, option_id);
  }

  private clearAllResponsesFromStorage() {
    let keys: string[] = [];
    for (let i = 0; i< localStorage.length; i++) {
      let key = localStorage.key(i);
      if (/^q\d+$/.test(key)) {
        keys.push(key)
      }
    }
    keys.forEach(key => this.storageService.remove(key));
  }

  private addFlickerToTimeBox() {
    this.time_box.nativeElement.classList.add('flickering-background');
    this.flicker_added = true;
  }

  private removeFlickerToTimeBox() {
    this.time_box.nativeElement.classList.remove('flickering-background');
  }

  startCountdown() {
    let timer = new Timer();
    timer.start({countdown: true, startValues: {seconds: 60 * this.duration}, target: {seconds: 0}});
    this.remaining_time = timer.getTimeValues().toString(['hours', 'minutes', 'seconds']);

    timer.addEventListener('secondsUpdated', ()=> {
      this.remaining_time = timer.getTimeValues().toString(['hours', 'minutes', 'seconds']);

      // add flicker to timebox if the time is less than the danger zone
      if (!this.flicker_added && timer.getTimeValues().minutes < this.danger_zone) this.addFlickerToTimeBox();
    });

    timer.addEventListener('targetAchieved', () => {
      this.removeFlickerToTimeBox();
      this.form.nativeElement.dispatchEvent(new Event('submit'));
    });
  }


  get currentQuestion() {
    return this.questions[this.current_question_id];
  }

  next() {
    this.current_question_id = Math.min(this.current_question_id + 1, this.questions.length - 1);
    return false;
  }

  previous() {
    this.current_question_id = Math.max(this.current_question_id - 1, 0);
    return false;
  }

  moveTo(index: number) {
    this.current_question_id = index;
    return false;
  }

  get reachedLastQuestion() {
    return this.current_question_id == this.questions.length - 1;
  }

  confirmSubmit() {
    this.show_confirm_submit_modal = true;
    return false;
  }

  cancelSubmit() {
    this.show_confirm_submit_modal = false;
  }

  proceedSubmit() {
    this.form.nativeElement.dispatchEvent(new Event('submit'));
    this.show_confirm_submit_modal = false;
  }

  onSubmit(form: HTMLFormElement) {
    this.submit_status = 'submitting';
    this.assignmentService.submitAssignment(this.questions_group.value, this.assignment_name).subscribe({
      next: response => {
        if (response.status == 'success') {
          this.submit_status = 'submitted';
          this.attempt_summary = response.attempt_summary;
          this.clearAllResponsesFromStorage();
        }
      }
    });

    return false;
  }

  get scorePercentage() {
    return Number((this.attempt_summary.points_obtained / this.attempt_summary.points_obtainable) * 100).toFixed(2);
  }
}
