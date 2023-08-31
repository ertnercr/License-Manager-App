import { ICustomer, ICustomerCreate, ICustomerUpdate, ILicense, ILicenseCreate, ILicenseUpdate } from "../types/Interfaces";
import { ConfigService } from "./ConfigService";
import { RealmHttpClient } from "@tuval/forms";
import { useSessionService } from '@realmocean/services';

export class LicenseManagerBrokerClient {

    // CUSTOMER API -- START

    // CREATE CUSTOMER
    public static async CreateLicenseManagerCustomer(data: ICustomerCreate): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            form.append('data', JSON.stringify(data));
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/CreateLicenseManagerCustomer", form
            )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data?.detail);
                });
        });
    }

    // GET ALL CUSTOMERS
    public static async GetAllLicenseManagerCustomers(): Promise<ICustomer[]> {
        return new Promise<ICustomer[]>((resolve, reject) => {
            const form = new FormData();
            form.append("tenant_id", useSessionService().TenantId);
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/GetAllLicenseManagerCustomers", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

    // GET CUSTOMER BY ID
    public static async GetLicenseManagerCustomerById(id: string): Promise<ICustomer> {
        return new Promise<ICustomer>((resolve, reject) => {
            const form = new FormData();
            form.append('id', id);
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/GetLicenseManagerCustomerById", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);    
            });
        });
    }

    // UPDATE CUSTOMER
    public static async UpdateLicenseManagerCustomer(data: ICustomerUpdate): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            form.append('data', JSON.stringify(data));
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/UpdateLicenseManagerCustomer", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

    // DELETE CUSTOMER
    public static async DeleteLicenseManagerCustomer(id: string, updated_at: Date): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const form = new FormData();
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            form.append('id', id);
            form.append('updated_at', updated_at.toString());
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/DeleteLicenseManagerCustomer", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

    // CUSTOMER API -- END

    // LICENSE API -- START

    // CREATE LICENSE
    public static async CreateLicenseManagerLicense(data: ILicenseCreate): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            form.append('data', JSON.stringify(data));
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/CreateLicenseManagerLicense", form
            )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data?.detail);
                });
        });
    }

    // GET ALL LICENSES
    public static async GetAllLicenseManagerLicenses(): Promise<ILicense[]> {
        return new Promise<ILicense[]>((resolve, reject) => {
            const form = new FormData();
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/GetAllLicenseManagerLicenses",form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

    // GET LICENSE BY ID
    public static async GetLicenseManagerLicenseById(id: string): Promise<ILicense> {
        return new Promise<ILicense>((resolve, reject) => {
            const form = new FormData();
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            form.append('id', id);
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/GetLicenseManagerLicenseById", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

    // UPDATE LICENSE
    public static async UpdateLicenseManagerLicense(data: ILicenseUpdate): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            form.append('data', JSON.stringify(data));
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/UpdateLicenseManagerLicense", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

    // DELETE LICENSE
    public static async DeleteLicenseManagerLicense(id: string, updated_at: Date): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const form = new FormData();
            form.append("account_id", useSessionService().AccountId);
            form.append("tenant_id", useSessionService().TenantId);
            form.append('id', id);
            form.append('updated_at', updated_at.toString());
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/DeleteLicenseManagerLicense", form
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

}