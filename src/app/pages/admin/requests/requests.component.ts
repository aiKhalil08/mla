import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Request$, RequestItem } from 'src/app/interfaces/request';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: RequestItem[];
  loaded: boolean = false;

  constructor (private requestService: RequestService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.requestService.getList('all').subscribe({
      next: (response) => {
        this.loaded = true;
        this.requests = response;
      }
    });
  }

  date(date: string) {
    return moment(date).format('D MMMM, Y');
  }

  substring(message: string) {
    return String(message).substring(0,100);
  }


  navigate(last_name: string, created_at: string) {
    this.router.navigate(['/admin/request', last_name, created_at]);
  }

}
