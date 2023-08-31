import { HStack, ReactView, Spinner, UIController, UIView, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem,GridToolbar } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography, gridClasses } from "@mui/material";
import { colorPicker } from "../../../components/ColorPicker";
import Chip from "@mui/material/Chip";
import Navbar from "../../../components/Navbar";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { ITenant, useOrgProvider } from "@realmocean/common";
import { ICustomer, ILicense } from "../../../types/Interfaces";
import PageContent from "../../../components/PageContent";
import { licenseNames } from "../../../assets/licenses";

export class LicenseListController extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [licenses, setLicenses] = useState<ILicense[]>([]);
    const [tenants, setTenants] = useState<ITenant[]>([]);
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    useEffect(() => {
      Promise.all([LicenseManagerBrokerClient.GetAllLicenseManagerLicenses(), useOrgProvider().getTenants(), LicenseManagerBrokerClient.GetAllLicenseManagerCustomers()])
        .then(res => {
          const [license, tenant, customer] = res;
          setLicenses(license);
          setCustomers(customer);
          setTenants(tenant);
          setIsLoading(false);
        })
        .catch(err => {
          console.log("err", err);
          alert("Müşteriler getirilemedi!");
        });
    }, []);

  
    const columns: GridColDef[] = [
      {
        field: "customer_id",
        headerName: "Müşteri Adı",
        valueGetter(params) {
          const customer = customers.find(customer => customer.id === params.value);
          return customer ? customer.name : "Tanımsız";
        },
        flex:1,
        editable: false,
        disableColumnMenu: true,
      },

      { 
        field: "app_id",
        valueGetter(params){
          const selectedLicense=licenseNames.find(license=>license.id===params.value);
          return selectedLicense? selectedLicense.name: "Bulunamadı"
        },
        headerName: "Lisans Adı",
        flex:1,
        editable: false,
        disableColumnMenu: true
      },

      {
        field: "type",
        headerName:"Lisans Türü",
        flex:1,
        editable: false,
        sortable: false,
        disableColumnMenu: true
      },
      { 
        field: "starting_date",
        headerName: "Lisans Başlangıç Tarihi",
        flex:1,
        editable: false,
        disableColumnMenu: true
      },

      { 
        field: "ending_date",
        headerName: "Lisans Geçerlilik Süresi",
        flex:1,
        editable: false,
        disableColumnMenu: true 
      },
      
      {
        field: "actions",
        type: "actions",
        headerName: "Düzenle/Sil",
        flex:1,
        getActions: e => [
          <GridActionsCellItem
            onClick={() => {
              navigate("/app/com.pedasoft.app.licensemanager/licenses/edit/" + e.id);
            }}
            icon={<EditIcon />}
            label="Edit"
          />,
        ],
      },
    ];
   
    const searchLicenses = (
      licenses: ILicense[],
      searchTerm: string
  ): ILicense[] => {
      const filteredLicenses: ILicense[] = [];
  
      for (const license of licenses) {
          if (
              license.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
              licenseNames.some(nameObj =>
                  nameObj.id === license.app_id && nameObj.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) ||
              customers.some(customer =>
                  customer.id === license.customer_id && customer.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
          ) {
              filteredLicenses.push(license);
          }
      }
  
      return filteredLicenses;
  };
    return HStack(
      isLoading
        ? Spinner()
        : ReactView(
            <PageContent
            path="Ana Sayfa > Lisans Yönetimi > Lisans Listesi"
            title="Lisans Listesi"
            searchValue={searchValue}
            searchFunc={(e) => setSearchValue(e.target.value)}
            addNewButtonText="Yeni Lisans Kaydet"
            addNewButtonOnClick={() => navigate("/app/com.pedasoft.app.licensemanager/licenses/add")}
            content={
                <div style={{ width: "100%", height: "100%", paddingBottom: "10px" }}>
                    <DataGrid rows={searchLicenses(licenses,searchValue)} columns={columns} />

                </div>
            } />
            
          )
    ).fontFamily("Poppins,sans-serif");
  }
}
