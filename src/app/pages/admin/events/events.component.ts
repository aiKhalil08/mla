import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { EventService } from 'src/app/services/event.service';
import { EventItem } from 'src/app/interfaces/event';
import moment from 'moment';


@Component({
    selector: 'app-events',
    standalone: true,
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css'],
    imports: [CommonModule, RedirectButtonComponent,]
})

export class EventsComponent implements OnInit {
    events!: EventItem[];
    loaded: boolean = false;
    date!: {start: string, end: string, 'duration-unit': string, duration: string};
    parse = (string: any) => {
      return JSON.parse(<string> string);
  };
    format = (string: any) => {
        return moment(string).format('MMMM DD, YYYY');
    };

    constructor(private eventService: EventService) {}

    ngOnInit(): void {
        this.eventService.getList('all').subscribe({
            next: (response) => {
                this.events = response;
                this.loaded = true;
            }
        });
    }
}
