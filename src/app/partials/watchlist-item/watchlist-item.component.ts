import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistItem } from 'src/app/interfaces/watchlist';

@Component({
  selector: 'app-watchlist-item',
  standalone: true,
  imports: [],
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.css']
})
export class WatchlistItemComponent {
  @Input() event: WatchlistItem;

  constructor(private router: Router) {}


  onClick() {
    this.router.navigate([`/home/event`,], {queryParams: {'name': this.event.name}});
  }
}
