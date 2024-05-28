import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-event-registration',
    standalone: true,
    templateUrl: './event-registration.component.html',
    styleUrl: './event-registration.component.css',
    imports: [CommonModule, EmptyContentComponent]
})
export class EventRegistrationComponent implements OnInit {

  id: string;
  fetching: boolean = false;
  registration: Registration & {message?: string};
  errorMessage: string;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      this.id = atob(param.get('id'));
      this.fetchRegistration();
    }); 
  }

  fetchRegistration() {
    this.fetching = true;
    this.eventService.getRegistration(this.id).subscribe({
      next: (response) => {
        this.fetching = false;

        this.registration = response.registration;
      },
      error: (response) => {
        this.fetching = false;

        if (response.error.status == 'empty') {
          this.errorMessage = response.error.message;
          return;
        }
      }
    });
  }

}
