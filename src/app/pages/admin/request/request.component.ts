import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Request$ } from 'src/app/interfaces/request';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent{
  // @Input() request: Request$;
  request: Request$;
  last_name: string;
  created_at: string;
  loaded: boolean = false;

  date(date: string) {
    return moment(date).format('D MMMM, Y');
  }

  constructor (private requestService: RequestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      this.last_name = param.get('last_name');
      this.created_at = param.get('created_at');
      this.getRequest();
    });
  }

  getRequest() {
    this.requestService.get(this.last_name, this.created_at).subscribe({
      next: (response) => {
        this.loaded = true;
        this.request = response;
        // console.log(response);
      }
    });
  }

  get name() {
    return `${this.request.first_name} ${this.request.last_name}`;
  }
}
