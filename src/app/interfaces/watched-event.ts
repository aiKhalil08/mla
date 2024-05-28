import { Event$ } from "./event";

interface WatchedEventResponse {
    status: string;
    message: string;
    event: Event$;
}

export {WatchedEventResponse};