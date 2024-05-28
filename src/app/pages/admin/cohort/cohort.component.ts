import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cohort } from 'src/app/interfaces/cohort';
import { CohortService } from 'src/app/services/cohort.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { PasswordConfirmationModalComponent } from "../../../partials/password-confirmation-modal/password-confirmation-modal.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { format } from 'date-fns';

@Component({
    selector: 'app-cohort',
    standalone: true,
    templateUrl: './cohort.component.html',
    styleUrls: ['./cohort.component.css'],
    imports: [CommonModule, EmptyContentComponent, RouterLink, PasswordConfirmationModalComponent, ReportBarComponent]
})
export class CohortComponent implements OnInit {

  cohort: Cohort;
  error: string = null;
  fetching: boolean;
  course_type: string;
  course_name: string;
  actions_folded: boolean = true;
  students_folded: boolean = true;

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  delete_confirmation: boolean = false;
  start_confirmation: boolean = false;
  conclude_confirmation: boolean = false;
  abort_confirmation: boolean = false;

  constructor(private cohortService: CohortService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    this.getCohort(name);
  }

  getCohort(name: string) {
    this.fetching = true;
    this.cohortService.get(name).subscribe({
      next: (response) => {
        this.fetching = false;
        console.log(response)
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
    cohort?: Cohort;
  }) {
    this.cohort = response.cohort;
    this.error = null;

    // console.log(this.cohort)


    if (this.course.type == 'App\\Models\\CertificateCourse') {
      this.course_type = 'Certificate course';
      this.course_name = `${this.course.title} - ${this.course.code}`;
    } else if (this.course.type == 'App\\Models\\CertificationCourse') {
      this.course_type = 'Certification course';
      this.course_name = `${this.course.title} - ${this.course.code}`;
    } else if (this.course.type == 'App\\Models\\OffshoreCourse') {
      this.course_type = 'Offshore course';
      this.course_name = `${this.course.title}`;
    }
  }


  get created_at() {
    return format(this.cohort.created_at, 'do MMMM, yyyy');
  }

  get start_date() {
    if (this.cohort.start_date == null) return 'Not set';
    return format(this.cohort.start_date, 'do MMMM, yyyy');
  }

  get end_date() {
    if (this.cohort.end_date == null) return 'Not set';
    return format(this.cohort.end_date, 'do MMMM, yyyy');
  }

  get duration() {
    let duration = JSON.parse(this.cohort.duration);
    if (duration.duration == null || duration.unit ==  null) return 'Not set';
    return `${duration.duration} ${duration.unit}`;
  }

  get price() {
    // if (this.course.price == null) console.log('price is null');
    let price = this.course.price;
    // console.log(price)
    if (price == null || price.amount == null || price.currency ==  null) return 'Not set';
    return `${price.amount} ${price.currency}`;
  }

  get course() {
    return this.cohort.course;
  }

  get students() {
    return this.cohort.students;
  }


  get link() {
    let id;
    let type = this.course_type.toLowerCase().replace(' ', '-');

    // console.log(type)
    if (type == 'offshore-course') id = this.course.title;
    else id = this.course.code;

    return `/${type}/${id}`;
  }


  show_confirmation_modal(type: string) {
    if (type == 'start') this.start_confirmation = true;
    else if (type == 'conclude') this.conclude_confirmation = true;
    else if (type == 'delete') this.delete_confirmation = true;
    else if (type == 'abort') this.abort_confirmation = true;

    this.actions_folded = true;
  }


  cancel_confirmation(type: string) {
    if (type == 'start') this.start_confirmation = false;
    else if (type == 'conclude') this.conclude_confirmation = false;
    else if (type == 'delete') this.delete_confirmation = false;
    else if (type == 'abort') this.abort_confirmation = false;
  }


  confirm_delete() {
    this.cancel_confirmation('delete');

    this.action_in_progress = 'Deleting cohort...';
    this.action_done = null;
    this.error_in_action = null;

    this.cohortService.delete(this.cohort.name).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.router.navigate(['/admin/cohorts']);
        }
      }
    });
  }

  confirm_conclude() {
    this.cancel_confirmation('conclude');

    this.action_in_progress = 'Concluding cohort...';
    this.action_done = null;
    this.error_in_action = null;

    this.cohortService.conclude(this.cohort.name).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.error_in_action = null;
          this.action_done = response.message;
          this.cohort.status = 'Concluded';
          this.cohort.end_date = response.end_date;
        }
      }
    });
  }

  confirm_start() {
    this.cancel_confirmation('start');

    this.action_in_progress = 'Starting cohort...';
    this.action_done = null;
    this.error_in_action = null;

    this.cohortService.start(this.cohort.name).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.error_in_action = null;
          this.action_done = response.message;
          this.cohort.status = 'In progress';
          this.cohort.start_date = response.start_date;
        }
      }
    });
  }

  confirm_abort() {
    this.cancel_confirmation('abort');

    this.action_in_progress = 'Aborting cohort...';
    this.action_done = null;
    this.error_in_action = null;

    this.cohortService.abort(this.cohort.name).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.error_in_action = null;
          this.action_done = response.message;
          this.cohort.status = 'Aborted';
        }
      }
    });
  }
}
