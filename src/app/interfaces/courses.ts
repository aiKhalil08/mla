import { Course } from "./course";

interface CertificateCourseItem {
    code: string,
    title: string,
    price: {amount: string, currency: string},
    discount?: string,
};

interface CertificationCourseItem {
    code: string,
    title: string,
    price: {amount: string, currency: string},
    discount?: string,
};

interface OffshoreCourseItem {
    title: string,
    price: {amount: string, currency: string},
    location: string;
    discount?: string,
};


interface Courses {
    'certificate_courses': CCourse[];
    'certification_courses': CCourse[];
    'offshore_courses': OCourse[];
}

interface CourseItem {
    code?: string;
    title?: string;
    image_url: string;
    number_of_modules: number;
    enrollment_type?: 'cohort' | 'individual';
    cohort_name?: string;
    category: 'certificate_courses' | 'certification_courses' | 'offshore_courses';
}


type CCourse = {
    code: string;
    title: string;
    image_url: string;
    number_of_modules: number;
    enrollment_type?: 'cohort' | 'individual';
    cohort_name?: string;
}

type OCourse = {
    title: string;
    image_url: string;
    number_of_modules: number;
    enrollment_type?: 'cohort' | 'individual';
    cohort_name?: string;
}

interface FetchCourseResponse {status: string, message?: string, course?: Course, certificate?: {name: string, url: string}}

export {CertificateCourseItem, CertificationCourseItem, OffshoreCourseItem, Courses, CourseItem, FetchCourseResponse};