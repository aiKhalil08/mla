import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Date } from 'src/app/interfaces/certificate-course';
import moment from 'moment';
import { EventService } from 'src/app/services/event.service';
import { Event$ } from 'src/app/interfaces/event';



@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  public event: Event$ | null = null;
  // recent_posts: {heading: string}[] | null = null;
  loaded: boolean = false;
  message_text: string;

  constructor (private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      name = param.get('name');
      this.getEvent(name);
    });
  }

  getEvent(name) {
    this.eventService.get(name).subscribe({
      next: (response) => {
        console.log('res is here', response)
        this.loaded = true;
        this.event = response;
        this.message_text = `Hello. I am chatting you regarding ${this.event.name.toUpperCase()}. My name is ___`;
        // this.recent_posts = response.recent_posts;
      }
    });
  }

  get start() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('MMM DD, yyyy');
  }
  get end() {
    return moment((<Date>JSON.parse(this.event.date)).end).format('MMM DD, yyyy');
  }
  get year() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('yyyy');
  }
}
