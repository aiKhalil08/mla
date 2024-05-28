import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { Registration } from 'src/app/interfaces/event';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-event-registrants',
    standalone: true,
    templateUrl: './event-registrants.component.html',
    styleUrl: './event-registrants.component.css',
    imports: [EmptyContentComponent, CommonModule, RedirectButtonComponent]
})
export class EventRegistrantsComponent implements OnInit {

  fetching: boolean;
  registrants: Registration[];
  event_not_found: string = null;
  // no_registrants: boolean;
  event_name: string;
  
  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit() {
    let name;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {name = param.get('name')});
    
    this.fetchEventRegistrants(name);
  }

  fetchEventRegistrants(name: string) {
    this.fetching = true;
    this.eventService.getRegistrations(name).subscribe({
      next: (response) => {
        this.fetching = false;
        this.event_name = response.event_name;
        this.registrants = response.registrants;
      },
      error: (response) => {
        this.fetching = false;
        if (response.error.status == 'empty') this.event_not_found = response.error.message;
      }
    });
  }

  encryptId(id: number) {
    return btoa(String(id));
  }
}
