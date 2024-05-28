import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import User from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';
import { ContinueAsModalComponent } from "../../../partials/continue-as-modal/continue-as-modal.component";
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [RouterLink, CommonModule, ContinueAsModalComponent]
})
export class StudentDashboardComponent {
  // dashboard: StudentDashboard;
  loaded: boolean = false;
  user: User;
  show_continue_as_modal: boolean;

  constructor(private dashboardService: StudentDashboardService, private router: Router, private auth: AuthService, private storageService: StorageService) {}

  ngOnInit(): void {
    // console.log(this.affiliate.get_affiliate()['is_affiliate'])
    this.user = this.auth.user();
    //   this.dashboardService.get().subscribe({
    //       next: (response) => {
    //         this.loaded = true;
    //         // console.log(response)
    //         // let token = response.access_token;
    //         // this.tokenService.set(token);
    //         // this.dashboard = response;
    //       }
    //   });
    if (this.storageService.exists('ask_which_role')) {
      this.show_continue_as_modal = true;
      this.storageService.remove('ask_which_role');
    }
  }

  get roles() {
    return this.user.roles;
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }

  removeModal() {
    this.show_continue_as_modal = false;
  }

  continueAs(role: string) {
    this.removeModal();
    if (role != 'student') document.location.href = '/admin';
  }
}
