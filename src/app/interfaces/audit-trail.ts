export interface AuditTrail {
    id: number;
    action: 'updated' | 'created' | 'deleted';
    date: string;
    actor?: {first_name: string, last_name: string, type: string};
    object_name: string;
}