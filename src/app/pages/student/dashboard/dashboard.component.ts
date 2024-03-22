import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import User from 'src/app/interfaces/user';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { AuthService } from 'src/app/services/auth.service';
import { JWTService } from 'src/app/services/jwt.service';
import { StudentDashboardService } from 'src/app/services/student-dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class StudentDashboardComponent {
  // dashboard: StudentDashboard;
  loaded: boolean = false;
  user: User;

  constructor(private dashboardService: StudentDashboardService, private router: Router, private auth: AuthService, private affiliate: AffiliateService) {}

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
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
