export interface ICustomer {
    id: string;
    name: string;
    email: string;
    customer_tenant_id: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    tenant_id: string;
}

export interface ILicense {
    id: string;
    customer_id: string;
    name: string;
    starting_date: string;
    ending_date: string;
    type: string;
    period: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    tenant_id: string;
}