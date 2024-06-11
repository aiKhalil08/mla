import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  first_name: string;
  constructor(private auth: AuthService) {} 

  ngOnInit(): void {
    this.first_name = this.auth.user().first_name;
  }
}
