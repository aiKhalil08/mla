interface Watchlist {
    watchlist: WatchlistItem[];
}

type WatchlistItem = {
    name: string;
    type: string;
    image_url?: string;
}

export {Watchlist, WatchlistItem};