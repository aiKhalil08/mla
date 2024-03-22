interface Request$ {
    first_name: string,
    last_name: string,
    phone_number: string,
    email_address: string,
    message: string,
    created_at: string;
};

interface RequestItem {
    first_name: string;
    last_name: string;
    sub_message: string;
    created_at: string;
    viewed: 0 | 1;
};

export {Request$, RequestItem};