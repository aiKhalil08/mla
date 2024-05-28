import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { PasswordConfirmationModalComponent } from "../../../partials/password-confirmation-modal/password-confirmation-modal.component";
import { ReportBarComponent } from "../../../partials/report-bar/report-bar.component";
import { format } from 'date-fns';
import { Admin } from 'src/app/interfaces/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    imports: [CommonModule, EmptyContentComponent, RouterLink, PasswordConfirmationModalComponent, ReportBarComponent]
})
export class AdminComponent implements OnInit {

  admin: Admin;
  error: string = null;
  fetching: boolean;
  actions_folded: boolean = true;
  permissions_folded: boolean = true;

  action_in_progress: string = null;
  action_done: string = null;
  error_in_action: string = null;

  delete_confirmation: boolean = false;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    let email;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {email = param.get('email')});
    this.getAdmin(email);
  }

  getAdmin(email: string) {
    this.fetching = true;
    this.adminService.get(email).subscribe({
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
    admin?: Admin;
  }) {
    this.admin = response.admin;
    this.error = null;
  }


 
  get permissions() {
    return this.admin.permissions;
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

    this.adminService.delete(this.admin.email).subscribe({
      next: (response) => {
        this.action_in_progress = null;
        if (response.status == 'failed') {
          this.error_in_action = response.message;
          return;
        } else {
          this.router.navigate(['/admin/admins']);
        }
      }
    });
  }
}
