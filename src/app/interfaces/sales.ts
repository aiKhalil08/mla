interface SaleRecord {
    student?: {full_name: string};
    price: string;
    date: string;
    id: number;
}

interface Sale {
    student?: {name: string, email: string};
    price: string;
    date: string;
    type: 'Cohort' | 'Individual Course';
    course?: {type: string, name: string};
    cohort?: {name: string};
    has_referral: boolean;
    affiliate: {referral_commission: string, referrer: {name: string, email: string,}};
}

export {SaleRecord, Sale}