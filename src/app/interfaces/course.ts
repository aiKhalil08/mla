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

interface Course {
    code?: string;
    title: string,
    overview: string,
    objectives: string[],
    attendees: string[],
    prerequisites: string[],
    modules: Module[],
    image_url: string,
}

export {Module, Date, Price, Course}