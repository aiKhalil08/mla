interface Admin {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image_url: string;
    permissions: {name: string}[];
}

export { Admin }