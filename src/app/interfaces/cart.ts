interface Course {
    'certificate_courses': CCourse[];
    'certification_courses': CCourse[];
    'offshore_courses': OCourse[];
}

interface CourseItem {
    code?: string;
    title?: string;
    image_url: string;
    number_of_modules: number;
    category: 'certificate_courses' | 'certification_courses' | 'offshore_courses';
}


type CCourse = {
    code: string;
    title: string;
    image_url: string;
    number_of_modules: number;
}

type OCourse = {
    code: string;
    title: string;
    image_url: string;
    number_of_modules: number;
}


// export {Cart, CartItem};