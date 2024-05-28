import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from 'src/app/services/admin-dashboard.service';
import { AdminDashboard } from 'src/app/interfaces/admin-dashboard';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dashboard: AdminDashboard;
  loaded: boolean = false;

  constructor(private dashboardService: AdminDashboardService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
      // console.log('initializing')
      this.dashboardService.get().subscribe({
          next: (response) => {
            this.loaded = true;
            this.dashboard = response;
          }
      });
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }

  get name() {
    return this.auth.user().first_name+' '+this.auth.user().last_name;
  }
}
