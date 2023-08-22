import { ICustomer } from "../types/Interfaces";
import { ConfigService } from "./ConfigService";
import { RealmHttpClient } from "@tuval/forms";

export class LicenseManagerBrokerClient {

    // CUSTOMER API
    public static async CreateLicenseManagerCustomer(data): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
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

    public static async GetAllLicenseManagerCustomers(): Promise<ICustomer[]> {
        return new Promise<ICustomer[]>((resolve, reject) => {
            RealmHttpClient.Post(
                ConfigService.GetLicenseManagerBrokerURL() + "/GetAllLicenseManagerCustomers"
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response.data?.detail);
            });
        });
    }

}