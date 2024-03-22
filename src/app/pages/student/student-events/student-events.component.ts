import { Component } from '@angular/core';
import { WatchlistComponent } from "../../../partials/watchlist/watchlist.component";
import { TrendingCoursesComponent } from "../../../partials/trending-courses/trending-courses.component";

@Component({
    selector: 'app-student-events',
    standalone: true,
    templateUrl: './student-events.component.html',
    styleUrls: ['./student-events.component.css'],
    imports: [WatchlistComponent, TrendingCoursesComponent]
})
export class StudentEventsComponent {

}
