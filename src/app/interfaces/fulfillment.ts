interface FulfillmentItem {
    id: number;
    student: {first_name: string, last_name: string};
    type: string;
    amount: number;
    status: number;
    date_added?: string;
    date_fulfilled?: string;
}

interface Fulfillment {
    name: string;
    email: string;
    amount: string;
    date: string;
    type: string;
    account_details: string;
}

export {FulfillmentItem, Fulfillment}