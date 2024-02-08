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

export {CertificateCourseItem, CertificationCourseItem, OffshoreCourseItem};