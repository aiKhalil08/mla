interface CertificationCourseItem {
    code: string,
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

interface CertificationCourse {
    code: string,
    title: string,
    overview: string,
    objectives: string,
    attendees: string,
    prerequisites: string,
    modules: string,
    date: string,
    price: string,
    discount?: string,
    image_url: string,
    schedule_url: string
}


interface GetCertificationCourseResponse {
    status: string;
    message?: string;
    course: CertificationCourse;
}

export { CertificationCourseItem, CertificationCourse, Module, Date, Price, GetCertificationCourseResponse }