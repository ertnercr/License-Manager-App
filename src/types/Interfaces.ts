// Customers

export interface ICustomerCreate {
    name: string;
    email: string;
    customer_tenant_id: string;
    created_at: Date;
}

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

export interface ICustomerUpdate {
    id: string;
    name: string;
    email: string;
    customer_tenant_id: string;
    is_active: boolean;
    updated_at: string;
}

export interface ICustomerDelete {
    id: string;
    updated_at: string;
}


// Licenses

export interface ILicenseCreate {
    customer_id: string;
    app_id: string;
    starting_date: Date;
    ending_date: Date;
    type: string;
    period: string;
    created_at: Date;
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

export interface ILicenseCreate {
    id: string,
    customer_id: string;
    app_id: string;
    starting_date: Date;
    ending_date: Date;
    type: string;
    period: string;
    updated_at: Date;
}

export interface ILicenseUpdate {
    id: string;
    customer_id: string;
    app_id: string;
    starting_date: Date;
    ending_date: Date;
    type: string;
    period: string;
    updated_at: Date;
}

export interface ILicenseDelete {
    id: string;
    updated_at: string;
}