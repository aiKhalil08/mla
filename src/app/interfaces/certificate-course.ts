import { Course, Price } from "./course";

interface CertificateCourseItem {
    code: string,
    title: string,
    sub_overview: string
};


interface CertificateCourse extends Course {
    code: string,
    price: Price,
    discount?: string,
    image_url: string,
}

interface GetCertificateCourseResponse {
    status: string;
    message?: string;
    course: CertificateCourse;
}

export {CertificateCourseItem, CertificateCourse, GetCertificateCourseResponse }