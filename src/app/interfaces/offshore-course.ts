import { Course, Date, Price } from "./course";

interface OffshoreCourseItem {
    title: string,
    sub_overview: string;
    location: string;
};


interface OffshoreCourse extends Course {
    date: Date,
    price: Price,
    discount?: string,
    location: string,
    image_url: string,
}


interface GetOffshoreCourseResponse {
    status: string;
    message?: string;
    course: OffshoreCourse;
}

export { OffshoreCourseItem, OffshoreCourse, GetOffshoreCourseResponse }