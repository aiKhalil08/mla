import { TestBed } from '@angular/core/testing';

import { EventWatchlistService } from './event-watchlist.service';

describe('EventWatchlistService', () => {
  let service: EventWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
