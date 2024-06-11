import { Date, Price } from "./course";

interface EventItem {
    name: string,
    date: Date,
    image_url: string,
};

type Popup = {
    heading?: string;
    subheading?: string;
    hashtags?: string[];
}

interface Event$ {
    name: string,
    description: string,
    popups: Popup[],
    date: Date,
    type: 'virtual' | 'physical',
    price: Price,
    attendees: string[],
    image_urls: string[],
}


interface GetEventResponse {
    status: string;
    message?: string;
    event: Event$;
}

interface Registration {
    id: number,
    first_name: string,
    last_name: string,
    email: string;
    phone_number: string;
}


export { EventItem, Event$, GetEventResponse, Registration }