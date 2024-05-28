import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { UserService } from 'src/app/services/user.service';
import UserProfile from 'src/app/interfaces/user-profile';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordConfirmationModalComponent } from "../../../partials/password-confirmation-modal/password-confirmation-modal.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [CommonModule, EmptyContentComponent, ReportBarComponent, PasswordConfirmationModalComponent]
})
export class UserComponent {


  user!: UserProfile;
  fetching: boolean = false;
  no_user: string = null;
  deleting: boolean;

  actions_folded: boolean = true;

  confirm_action: boolean = false;
  pending_action: {funtion_name?: string, arguments?: any[]} = {funtion_name: null, arguments: null};

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private navigator: Router) {}

  ngOnInit() {
    let email: string;

    this.route.paramMap.subscribe((params) => {
      email = params.get('email');
    });
    
    this.fetch_user(email);
  }

  fetch_user(email: string) {
    this.fetching = true;
      
      this.userService.getUserProfile(email).subscribe({
        next: (response) => {
          this.fetching = false;
          if (response.status == 'failed') {
            this.no_user = response.message;
            return;
          }
          this.handleResponse(response);
        }
      });
  }

  handleResponse(response: {
    status: string;
    message?: string;
    user?: UserProfile;
  }) {
    this.user = response.user;
    setTimeout(()=>{
      (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.user.image_url || './assets/images/avatar.jpg';
      
    }, 0);
  }

  get isAdmin() {
    return this.user.roles.some((role) => role.name == 'admin');
  }

  get isTutor() {
    return this.user.roles.some((role) => role.name == 'tutor');
  }

  get isExternal() {
    return this.user.roles.some((role) => role.name == 'external_user');
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

  makeOrRevoke(role_name: 'Admin' | 'Tutor', action: 0 | 1) {
    // if 0, revoke admin from the user. If 1, make the user admin

    let email = this.user.email;

    let form = new FormData();
    form.append('action', String(action));
    form.append('email', email);

    this.action_in_progress = action == 0 ? `Revoking ${role_name} from user...` : `Assigning ${role_name} to user...`;

    this.userService.makeOrRevoke(role_name.toLowerCase(), form).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        }
        this.action_done = response.message;
        this.error_in_action = null;
        if (action == 1) {
          this.user.roles.push({name: role_name.toLowerCase()});
        } else {
          this.user.roles = this.user.roles.filter(role => role.name != role_name.toLowerCase());
        }
      }
    });
  }

  delete(email: string) {
    this.action_in_progress = 'Deleting user...';
    this.userService.delete(email).subscribe({
      next: (response) => {
        this.action_in_progress = null;

        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        }
        // this.action_done = response.message;
        this.navigator.navigate(['/admin/users']);
        this.error_in_action = null;
      },
    });
  }
}
