import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WatchlistItem } from 'src/app/interfaces/watchlist';
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
  fetching: boolean;
  empty: string = null;

  constructor(private watchlistService: EventWatchlistService) {}

  ngOnInit(): void {
      this.fetchWatchlist();
  }

  fetchWatchlist() {
    this.fetching = true;
    this.watchlistService.fetch_watchlist().subscribe({
      next: (response) => {
        this.fetching = false;
        this.handleResponse(response)
      }
    });
  }


  handleResponse(response: {
    status: string;
    message: string;
    watchlist: WatchlistItem[];
  }) {
    if (response.status == 'empty') {
      this.empty = response.message;
      return;
    }

    this.watchlist = response.watchlist;
  }
}
