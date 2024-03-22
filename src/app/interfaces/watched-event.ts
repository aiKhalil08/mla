interface WatchedEvent {
    name: string;
    description: string;
    attendees: string;
    image_url: string;
    price: string;
    type: 'virtual' | 'physical';
    date: string;
}

interface WatchedEventResponse {
    status: string;
    message: string;
    event: WatchedEvent;
}

export {WatchedEvent, WatchedEventResponse};