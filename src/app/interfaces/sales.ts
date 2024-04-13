interface SaleRecord {
    student: string;
    price: string;
    date: string;
    id: number;
}

interface Sale {
    student: {name: string, email: string};
    price: string;
    date: string;
    type: 'Cohort' | 'Individual Course';
    course?: {type: string, name: string};
    cohort?: {name: string};
    affiliate: {name: string, email: string, commission: string};
}

export {SaleRecord, Sale}