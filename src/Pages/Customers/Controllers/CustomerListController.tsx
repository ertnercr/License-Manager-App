import { HStack, ReactView, UIController, UIView, cTop, useNavigate, useEffect, VStack, Spinner } from "@tuval/forms";
import React, { useState } from "react";
import PageContent from "../../../components/PageContent";
import { ICustomer } from "../../../types/Interfaces";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { ITenant, useOrgProvider } from "@realmocean/common";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

export class CustomerListController extends UIController {


    public LoadView(): UIView {
        const navigate = useNavigate()
        const [filteredCustomers,setFilteredCustomers]=useState<ICustomer[]>([])
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
                field: 'actions',
                type: 'actions',
                width: 100,
                getActions: (e) => [
                  <GridActionsCellItem onClick={()=>{navigate("/app/com.pedasoft.app.licensemanager/customers/edit/"+e.id)}} icon={<EditIcon />} label="Edit" />,
                 
                ],
              },
        ]
   
        const filterCustomersByProperty = (customers: ICustomer[], searchValue: string): ICustomer[] => {
            const filteredCustomers = customers.filter(customer => {
                const customerValues = Object.values(customer);

                for (const value of customerValues) {
                    if (typeof value === "string" && value.toLowerCase().includes(searchValue.toLowerCase())) {
                        return true;}}
                return false;
            });

            return filteredCustomers;
        };
        

        return (
            HStack(
                isLoading ? Spinner() :
                    ReactView(
                        <PageContent
                            path="Ana Sayfa > Müşteri Yönetimi > Müşteri Listesi"
                            title="Müşteri Listesi"
                            searchValue={searchValue}
                            searchFunc={(e)=>setSearchValue(e.target.value)}
                            addNewButtonText="Yeni Müşteri Ekle"
                            searchArea={customers}
                            addNewButtonOnClick={() => navigate("/app/com.pedasoft.app.licensemanager/customers/add")}
                            content={
                                <div style={{ width: "100%", height: "90%", paddingBottom: "10px" }}>
                                    <DataGrid  rows={filterCustomersByProperty(customers,searchValue)} columns={columns} />
                                </div>
                            } />
                    )
            ).fontFamily("Poppins,sans-serif")
        )

    }
}
