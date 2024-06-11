import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Assignment } from 'src/app/interfaces/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ReportBarComponent } from "../../../../partials/report-bar/report-bar.component";
import { CommonModule } from '@angular/common';
import { PasswordConfirmationModalComponent } from "../../../../partials/password-confirmation-modal/password-confirmation-modal.component";
import { EmptyContentComponent } from "../../../../partials/empty-content/empty-content.component";
import { format } from 'date-fns';

@Component({
    selector: 'app-assignment',
    standalone: true,
    templateUrl: './assignment.component.html',
    styleUrl: './assignment.component.css',
    imports: [ReportBarComponent, CommonModule, RouterLink, PasswordConfirmationModalComponent, EmptyContentComponent]
})
export class AssignmentComponent implements OnInit {

  assignment: Assignment;
  error: string = null;
  fetching: boolean;
  actions_folded: boolean = true;
  // assignments_folded: boolean = true;

  confirm_action: boolean = false;
  pending_action: {funtion_name?: string, arguments?: any[]} = {funtion_name: null, arguments: null};

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit(): void {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    this.fetchAssignment(name);
  }

  fetchAssignment(name: string) {
    this.fetching = true;
    this.assignmentService.get(name).subscribe({
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
    assignment?: Assignment;
  }) {
    this.assignment = response.assignment;
    console.log(this.assignment.shuffle)
    this.error = null;

  }


  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy');
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

  start() {
    this.changeStatus('start');
  }

  conclude() {
    this.changeStatus('conclude');
  }

  changeStatus(new_status: 'start' | 'conclude') {
    let actions = {start: 'Starting', conclude: 'Concluding'};
    this.action_in_progress = actions[new_status]+' assignment...';
    this.action_done = null;
    this.error_in_action = null;

    this.assignmentService.changeStatus(this.assignment.name, new_status).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.error_in_action = null;
          this.action_done = response.message;
          if (new_status == 'start') {
            this.assignment.status.name = 'In progress';
            this.assignment.start_date = response.start_date;
          } else if (new_status == 'conclude') {
            this.assignment.status.name = 'Concluded';
            this.assignment.end_date = response.end_date;
          }
        }
      }
    });
  }

  delete() {
    this.action_in_progress = 'Deleting assignment...';
    this.assignmentService.delete(this.assignment.name).subscribe({
      next: (response) => {
        this.action_in_progress = null;

        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        }
        // this.action_done = response.message;
        this.navigator.navigate(['/quiz/admin/assignments']);
        this.error_in_action = null;
      },
    });
  }
}
