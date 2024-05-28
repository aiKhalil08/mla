import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItem } from 'src/app/interfaces/event';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { WatchlistButtonComponent } from "../watchlist-button/watchlist-button.component";
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { format } from 'date-fns';

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
    if (this.auth.isLoggedIn() && this.auth.user().hasRole('student') && this.watchlist.has(this.event.name)) this.watched = true;
  }

  get start() {
    return format(this.event.date.start, 'MMM dd');
  }
  get end() {
    return format(this.event.date.end, 'MMM dd');
  }
  get year() {
    return format(this.event.date.start, 'yyy');
  }
}
