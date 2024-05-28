import { Course, Price } from "./course";

interface CohortItem {
    name: string;
    status: {name: string};
};


interface CohortCourse extends Course {
    type: string;
    price: Price;
    image: string;
}

type Students = {first_name: string, last_name: string, email: string}[];

interface Cohort {
    name: string;
    start_date?: string;
    end_date?: string;
    duration: string;
    status: 'Concluded' | 'Pending' | 'In progress' | 'Aborted';
    created_at: string;

    course: CohortCourse;

    students: Students;
}

interface EditableCohort {
    name: string;
    course_type: string;
    course: {code?: string, title: string};
    duration: string;
    start_date: string;
    end_date: string;
}

export {CohortItem, Cohort, EditableCohort};