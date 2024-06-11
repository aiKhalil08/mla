import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BaseResponse from 'src/app/interfaces/base-response';
import { Question, Response } from 'src/app/interfaces/quiz';
import { AssignmentService } from 'src/app/services/assignment.service';
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-review-assignment',
    standalone: true,
    templateUrl: './review-assignment.component.html',
    styleUrl: './review-assignment.component.css',
    imports: [CommonModule, EmptyContentComponent, ReactiveFormsModule]
})
export class ReviewAssignmentComponent implements OnInit {

  fetch_status: 'fetching' | 'fetched'; 
  empty: string = null;

  questions: Question[];
  responses: Response[];
  current_question_id: number = 0;
  assignment_name: string;

  responses_group: FormGroup;

  // duration: number;
  // remaining_time: string;


  // @ViewChild('form', {static: false}) form: ElementRef;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assignment_name = params['name'];
      this.fetchAssignmentReview();
    })
  }

  fetchAssignmentReview() {
    this.fetch_status = 'fetching';
    this.assignmentService.getAssignmentReview(this.assignment_name).subscribe({
      next: (response) => {
        this.fetch_status = 'fetched';
        if (response.status == 'empty') {
          this.empty = response.message;
          return;
        }
        this.handleFetchAssignmentReview(response);
      }
   });
  }

  handleFetchAssignmentReview(response: BaseResponse & {questions: Question[]; responses: Response[]}) {
    this.questions = response.questions;
    this.responses = response.responses;

    console.log(this.questions);
    console.log(this.responses);

    let controls: object = {};

    this.responses.forEach(response => controls[response.question_id] = this.fb.control(response.option_id));

    this.responses_group = this.fb.group(controls);
  }

  get fetching() {return this.fetch_status == 'fetching'}
  get fetched() {return this.fetch_status == 'fetched'}


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


  // onSubmit(form: HTMLFormElement) {
  //   this.submit_status = 'submitting';
  //   this.assignmentService.submitAssignment(this.questions_group.value, this.assignment_name).subscribe({
  //     next: response => {
  //       if (response.status == 'success') {
  //         this.submit_status = 'submitted';
  //         this.attempt_summary = response.attempt_summary;
  //       }
  //     }
  //   });

  //   return false;
  // }

  // get scorePercentage() {
  //   // return Number((this.attempt_summary.points_obtained / this.attempt_summary.points_obtainable) * 100).toFixed(2);
  // }
}
