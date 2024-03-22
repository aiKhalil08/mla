import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItem } from 'src/app/interfaces/event';
import moment from 'moment';
import { Date } from 'src/app/interfaces/certificate-course';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { WatchlistButtonComponent } from "../watchlist-button/watchlist-button.component";
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-event-item',
    standalone: true,
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.css'],
    imports: [CommonModule, ExpandItemLinkComponent, WatchlistButtonComponent]
})
export class EventItemComponent implements OnInit {
  @Input() event!: EventItem;
  watched: boolean;

  constructor(private watchlist: EventWatchlistService, private auth: AuthService) {}
  

  ngOnInit(): void {
    if (this.auth.isLoggedIn('student') && this.watchlist.has(this.event.name)) this.watched = true;
  }

  get start() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('MMM DD');
  }
  get end() {
    return moment((<Date>JSON.parse(this.event.date)).end).format('MMM DD');
  }
  get year() {
    return moment((<Date>JSON.parse(this.event.date)).start).format('yyyy');
  }
}
