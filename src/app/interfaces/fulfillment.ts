interface FulfillmentItem {
    id: number;
    affiliate: {full_name: string};
    type: string;
    amount: number;
    status: {name: string};
    date_added?: string;
    date_fulfilled?: string;
}

interface Fulfillment {
    amount: string;
    date_added: string;
    type: string;
    account_details: {account_number: string, account_name: string, bank_name: string};
    affiliate: {full_name: string, email: string};
}

export {FulfillmentItem, Fulfillment}