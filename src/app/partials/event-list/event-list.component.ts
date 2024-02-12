import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { EventItemComponent } from '../event-item/event-item.component';
import { EventItem } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-event-list',
    standalone: true,
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, EventItemComponent]
})
export class EventListComponent implements OnInit {
  // @Input() type!: string;
  @Input() count: number | 'all' = 'all';
  events: EventItem[];
  loaded: boolean = false;
  constructor (private eventService: EventService) {}

  ngOnInit() {
    console.log('we here', )
    this.eventService.getList(this.count).subscribe({
      next: (response) => {
        console.log(response)
        this.loaded = true;
        this.events = response;
        console.log(response);
      },
    });
  }
}
