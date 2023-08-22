import { HStack, ReactView, UIController, UIView, cTop, useNavigate, useEffect, VStack, Spinner } from "@tuval/forms";
import React, { useState } from "react";
import PageContent from "../../../components/PageContent";
import { ICustomer } from "../../../types/Interfaces";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


export class CustomerListController extends UIController {


    public LoadView(): UIView {
        const navigate = useNavigate()

        const [isLoading, setIsLoading] = useState<boolean>(true)

        const [searchValue, setSearchValue] = useState<string>("")
        const [customers, setCustomers] = useState<ICustomer[]>([])

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
                headerName: "Müşteri Tenant Id",
                field: "customer_tenant_id",
                width: 200
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

        useEffect(() => {
            LicenseManagerBrokerClient.GetAllLicenseManagerCustomers().then((res) => {
                setCustomers(res)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                alert("Müşteriler getirilemedi!")
            })
        }, [])


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
