interface OffshoreCourseItem {
    title: string,
    sub_overview: string
};

type Module = {
    objective: string,
    overview: string
}

type Date = {
    start: string,
    duration: string,
    'duration-unit': string,
    end: string
}

type Price = {
    amount: string,
    currency: 'NGN (₦)' | 'USD ($)';
}

interface OffshoreCourse {
    title: string,
    overview: string,
    objectives: string,
    attendees: string,
    prerequisites: string,
    modules: string,
    date: string,
    price: string,
    discount?: string,
    location: string,
    image_url: string,
    schedule_url: string
}

export { OffshoreCourseItem, OffshoreCourse, Module, Date, Price }