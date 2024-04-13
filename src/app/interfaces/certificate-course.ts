interface CertificateCourseItem {
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

interface CertificateCourse {
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

interface GetCertificateCourseResponse {
    status: string;
    message?: string;
    course: CertificateCourse;
}

export { CertificateCourseItem, CertificateCourse, Module, Date, Price, GetCertificateCourseResponse }