import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Watchlist, WatchlistItem } from 'src/app/interfaces/watchlist';
import { EventWatchlistService } from 'src/app/services/event-watchlist.service';
import { WatchlistItemComponent } from "../watchlist-item/watchlist-item.component";
import { EmptyContentComponent } from "../empty-content/empty-content.component";

@Component({
    selector: 'app-watchlist',
    standalone: true,
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.css'],
    imports: [CommonModule, WatchlistItemComponent, EmptyContentComponent]
})
export class WatchlistComponent {
  watchlist: WatchlistItem[];

  constructor(private watchlistService: EventWatchlistService) {}

  ngOnInit(): void {
      this.watchlistService.fetch_watchlist().subscribe({
        next: (response) => {
  
          this.handleResponse(response)
        }
      });
  }


  handleResponse(response: Watchlist) {
    this.watchlist = response.watchlist;
    console.log(this.watchlist)
  }
}
