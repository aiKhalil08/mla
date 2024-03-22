import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchedEvent, WatchedEventResponse } from 'src/app/interfaces/watched-event';
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { WatchedEventComponent } from "../../../partials/watched-event/watched-event.component";
import { TrendingCoursesComponent } from "../../../partials/trending-courses/trending-courses.component";

@Component({
    selector: 'app-student-event',
    standalone: true,
    templateUrl: './student-event.component.html',
    styleUrls: ['./student-event.component.css'],
    imports: [CommonModule, WatchedEventComponent, TrendingCoursesComponent]
})
export class StudentEventComponent implements OnInit {
  event: WatchedEvent;
  event_name: string;

  constructor(private watchlist: EventWatchlistService, private route: ActivatedRoute) {}


  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.event_name = params['name'];
          this.get_course(this.event_name);
      });

  }

  get_course(event_name: string) {
      this.watchlist.fetch_watched_event(event_name).subscribe({
          next: (response) => {
              if (response.status == 'success') this.handleResponse(response);
          }
      });
  }



  handleResponse(response: WatchedEventResponse) {
      this.event = response.event;
  }
}
