import { Component } from '@angular/core';
import { Event$ } from 'src/app/interfaces/event';
import { EventListComponent } from "../../partials/event-list/event-list.component";

@Component({
    selector: 'app-events',
    standalone: true,
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css'],
    imports: [EventListComponent]
})
export class EventsComponent {
  // events: Event$[]
}
