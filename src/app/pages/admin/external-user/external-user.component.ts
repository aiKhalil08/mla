import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExternalUser } from 'src/app/interfaces/external-user';
import { ExternalUserService } from 'src/app/services/external-user.service';
import { PasswordConfirmationModalComponent } from "../../../partials/password-confirmation-modal/password-confirmation-modal.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-external-user',
    standalone: true,
    templateUrl: './external-user.component.html',
    styleUrl: './external-user.component.css',
    imports: [CommonModule, PasswordConfirmationModalComponent, RouterLink, ReportBarComponent, EmptyContentComponent]
})
export class ExternalUserComponent implements OnInit {
  user: ExternalUser;
  error: string = null;
  fetching: boolean;
  actions_folded: boolean = true;
  permissions_folded: boolean = true;

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  delete_confirmation: boolean = false;

  constructor(private userService: ExternalUserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    let email;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {email = param.get('email')});
    this.getAdmin(email);
  }

  getAdmin(email: string) {
    this.fetching = true;
    this.userService.get(email).subscribe({
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
    user?: ExternalUser;
  }) {
    this.user = response.user;
    this.error = null;
  }


  show_confirmation_modal(type: string) {
    this.delete_confirmation = true;

    this.actions_folded = true;
  }


  cancel_confirmation(type: string) {
    this.delete_confirmation = false;
  }


  confirm_delete() {
    this.cancel_confirmation('delete');

    this.action_in_progress = 'Deleting admin...';
    this.action_done = null;
    this.error_in_action = null;

    this.userService.delete(this.user.email).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.router.navigate(['/admin/external-users']);
        }
      }
    });
  }
}
