interface CartedCourse {
    code?: string;
    title: string;
    image_url: string;
    modules: string;
    overview: string;
    objectives: string;
    prerequisites: string;
    attendees: string;
}

interface CartedCourseResponse {status: string, message?: string, course?: CartedCourse}

export {CartedCourse, CartedCourseResponse};