interface TestimonialItem {
    name: string,
    company?: string,
    designation?: string,
    message: string,
    image_url: string,
};

interface Testimonial {
    name: string,
    company?: string,
    designation?: string,
    message: string,
    image_url: string,
}

interface GetTestimonialResponse {
    status: string;
    message?: string;
    testimonial: Testimonial
}


export { TestimonialItem, Testimonial, GetTestimonialResponse}