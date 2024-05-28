import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { EventService } from 'src/app/services/event.service';
import { EventItem } from 'src/app/interfaces/event';
import { format } from 'date-fns';


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

    
    constructor(private eventService: EventService) {}

    ngOnInit(): void {
        this.eventService.getList('all').subscribe({
            next: (response) => {
                this.events = response;
                this.loaded = true;
            }
        });
    }


    parse = (string: any) => {
      return JSON.parse(<string> string);
    };

    format = (string: any) => {
        return format(string, 'MMMM dd, yyyy');
    };

    getEventLink(event_name: string): string {
        return document.location.protocol+'//'+document.location.host+'/event/'+encodeURIComponent(event_name);
    }

    async copyEventLink(link: string, click_event: Event) {
        try {
          await navigator.clipboard.writeText(link);
          (<HTMLElement>click_event.target).innerHTML = 'Copied';
        } catch (e) {
            alert('Could not copy link');
        }
    }
}
