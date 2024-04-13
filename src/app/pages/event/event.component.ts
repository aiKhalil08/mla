import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Date } from 'src/app/interfaces/certificate-course';
import moment from 'moment';
import { EventService } from 'src/app/services/event.service';
import { Event$ } from 'src/app/interfaces/event';
import { ContactUsButtonComponent } from "../../partials/contact-us-button/contact-us-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { WatchlistButtonComponent } from "../../partials/watchlist-button/watchlist-button.component";
import { EmptyContentComponent } from "../../partials/empty-content/empty-content.component";



@Component({
    selector: 'app-event',
    standalone: true,
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
    imports: [CommonModule, RouterLink, ContactUsButtonComponent, WatchlistButtonComponent, EmptyContentComponent]
})
export class EventComponent {
  public event: Event$ | null = null;
  fetching: boolean = false;
  message_text: string;
  watched: boolean;
  no_event: string = null;

  constructor (private eventService: EventService, private route: ActivatedRoute, private auth: AuthService, private watchlist: EventWatchlistService) {}

  ngOnInit() {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      name = param.get('name');
      this.getEvent(name);
    });
  }

  getEvent(name) {
    this.fetching = true;
    this.eventService.get(name).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.no_event = response.message;
          return;
        }
        this.event = response.event;
        if (this.auth.isLoggedIn('student') && this.watchlist.has(this.event.name)) this.watched = true;
        this.message_text = `Hello. I am chatting you regarding ${this.event.name.toUpperCase()}. My name is ___`;
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
