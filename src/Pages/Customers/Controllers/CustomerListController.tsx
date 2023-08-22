import { HStack, ReactView, UIController, UIView, cTop, useNavigate, useEffect, VStack, Spinner } from "@tuval/forms";
import React, { useState } from "react";
import PageContent from "../../../components/PageContent";
import { ICustomer } from "../../../types/Interfaces";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { ITenant, useOrgProvider } from "@realmocean/common";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


export class CustomerListController extends UIController {


    public LoadView(): UIView {
        const navigate = useNavigate()

        const [isLoading, setIsLoading] = useState<boolean>(true)

        const [searchValue, setSearchValue] = useState<string>("")
        const [customers, setCustomers] = useState<ICustomer[]>([])
        const [tenants, setTenants] = useState<ITenant[]>([])


        useEffect(() => {
            Promise.all([
                LicenseManagerBrokerClient.GetAllLicenseManagerCustomers(),
                useOrgProvider().getTenants()
            ]).then((res) => {
                const [customers, tenants] = res

                setCustomers(customers)
                setTenants(tenants)
                setIsLoading(false)

            }).catch((err) => {
                console.log(err)
                alert("Müşteriler getirilemedi!")
            })
        }, [])

        const columns: GridColDef[] = [
            {
                headerName: "Müşteri Adı",
                field: "name",
                flex: 1
            },
            {
                headerName: "Müşteri Email",
                field: "email",
                flex: 1
            },
            {
                headerName: "Müşteri Tenant",
                field: "customer_tenant_id",
                width: 200,
                valueGetter(params) {
                    const tenant = tenants.find((tenant) => tenant.Id === params.value)
                    return tenant ? tenant.Name : "Tanımsız"
                },
            },
            {
                headerName: "İşlemler",
                field: "actions",
                width: 100,
                renderCell: (params) => (
                    <div>
                        a
                    </div>
                )
            }
        ]



        return (
            HStack({ alignment: cTop })(
                isLoading ? VStack(Spinner()) :
                    ReactView(
                        <PageContent
                            path="Ana Sayfa > Müşteri Yönetimi > Müşteri Listesi"
                            title="Müşteri Listesi"
                            searchValue={searchValue}
                            searchFunc={(e) => setSearchValue(e.target.value)}
                            addNewButtonText="Yeni Müşteri Ekle"
                            addNewButtonOnClick={() => navigate("/app/com.pedasoft.app.licensemanager/customers/add")}
                            content={
                                <div style={{ width: "100%", height: "100%", paddingBottom: "10px" }}>
                                    <DataGrid rows={customers} columns={columns} />
                                </div>
                            } />
                    )
            ).fontFamily("Poppins,sans-serif")
        )

    }
}
