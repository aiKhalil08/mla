type ExternalUser = {
    first_name: string;
    last_name: string;
    email: string;
    company: {name: string}
};

export { ExternalUser }