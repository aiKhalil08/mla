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
    course: {type: string, name: string};
    affiliate: {name: string, email: string, commission: string};
}

export {SaleRecord, Sale}