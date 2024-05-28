export default interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image_url: string;
    info: {
        home_address: string;
        bio: string;
    };
    roles?: {name: string}[]
}