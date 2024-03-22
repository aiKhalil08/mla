import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Watchlist } from '../interfaces/watchlist';
import { WatchedEventResponse } from '../interfaces/watched-event';

@Injectable({
  providedIn: 'root'
})
export class EventWatchlistService {

  constructor(private http: HttpClient, @Inject('DOMAIN_NAME') private domain_name, private storageService: StorageService) { }


  add_event_to_watchlist(event_name: string) {
    let url = `${this.domain_name}/student/watchlist`;
    let form = new FormData();
    form.append('event_name', event_name);

    return <Observable<{status: string, message: string, watchlist: string[]}>>this.http.post(url, form);
  }

  fetch_watchlist() {
    let url = `${this.domain_name}/student/watchlist`;

    return <Observable<Watchlist>>this.http.get(url);
  }

  fetch_watched_event(event_name: string) {
    let url = `${this.domain_name}/student/watchlist/${event_name}`;


    return <Observable<WatchedEventResponse>>this.http.get(url);
  }

  set_watchlist(watchlist: any) {
    this.storageService.set('watchlist', watchlist);
  }


  get_watchlist() {
    if (!this.storageService.exists('watchlist')) return false;
    let encoded_watchlist = this.storageService.get('watchlist');
    return <string[]>JSON.parse(atob(encoded_watchlist));
  }

  exists() {
    return this.storageService.exists('watchlist');
  }

  remove() {
    if (this.storageService.exists('watchlist')) this.storageService.remove('watchlist');
  }

  has(event_name: string) {
    if (this.storageService.exists('watchlist')) {
      let watchlist = <string[]>(this.get_watchlist());
      return watchlist.some((event: string) => event == event_name);
    }
    return false;
  }
}
