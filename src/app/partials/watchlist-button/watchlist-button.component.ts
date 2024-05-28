import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';

@Component({
  selector: 'app-watchlist-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist-button.component.html',
  styleUrls: ['./watchlist-button.component.css']
})
export class WatchlistButtonComponent {
  @Input() watched: boolean;
  @Input() type: 'tag' | 'button' = 'tag';
  @Input() event: {name: string};
  processing: boolean = false;


  @HostListener('click', ['$event']) add(event) {  
    if (!(this.authService.isLoggedIn() && this.authService.user().hasRole('student'))) document.location.href = 'login';
    if (this.watched || this.processing) return false;
    this.processing = true;

      this.watchlistService.add_event_to_watchlist(this.event.name).subscribe({
        next: (response) => {
          this.processing = false;
          if (response.status == 'success') {
            this.watched = true;
            this.watchlistService.set_watchlist(response.watchlist);
          }
        }
      });
    
    return false;

  }


  constructor (private watchlistService: EventWatchlistService, private authService: AuthService) {}
}
