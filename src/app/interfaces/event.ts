interface EventItem {
    name: string,
    date: string,
    image_url: string,
};

interface Event$ {
    name: string,
    description: string,
    date: string,
    type: 'virtual' | 'physical',
    price: string,
    attendees: string,
    image_url: string,
}



export { EventItem, Event$ }