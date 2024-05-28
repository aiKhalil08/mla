import { Course } from "./course"

interface CertificationCourseItem {
    code: string,
    title: string,
    sub_overview: string
};

interface CertificationCourse extends Course {
    code: string,
    image_url: string,
}


interface GetCertificationCourseResponse {
    status: string;
    message?: string;
    course: CertificationCourse;
}

export { CertificationCourseItem, CertificationCourse, GetCertificationCourseResponse }