import { HStack, ReactView, UIController, UIView, useNavigate } from "@tuval/forms";
import React, { useState, useEffect } from "react";
import Toast from "../../../components/Toast";
import { Button } from "@mui/material";
import {licenseNames} from "../../../assets/licenses"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { ITenant, useOrgProvider } from "@realmocean/common";
import { ICustomer, ILicense } from "../../../types/Interfaces";
import PageContent from "../../../components/PageContent";
import dayjs from "dayjs";

export class AddLicenseController extends UIController {
  public LoadView(): UIView {
    interface IValues {
      customer_id: string;
      app_id: string;
      starting_date: string;
      ending_date: string;
      type: string;
      period: string;
      created_at: Date;
     
    }
    
    const defaultValues: IValues = {
      customer_id: "",
      app_id: "",
      starting_date:"",
      ending_date: "",
      type: "",
      period: "",
      created_at: new Date(),
    
    };
    const navigate=useNavigate();
    const [date, setDate] = useState<Date>();
    const [values, setValues] = useState<IValues>(defaultValues);
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [tenants, setTenants] = useState<ITenant[]>([]);
    const [licenses, setLicenses] = useState<ILicense[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      Promise.all([LicenseManagerBrokerClient.GetAllLicenseManagerCustomers(),
        useOrgProvider().getTenants(),
       ])
        .then(res => {
          const [customer, tenants] = res;

          setCustomers(customer);
          setTenants(tenants);
          setIsLoading(false);
          
        })
        .catch(err => {
          console.log("err", err.message);
          alert("Bir Sorun Oluştu!");
        });
    }, []);

    //Periyot değiştikçe bitiş tarihi hesaplayıcısı çalışır.
    useEffect(() => {
      if (values.period!=="")
      endingDateFinder();
    }, [values.period]);

    const onDateChange = (date: Date) => {
      setDate(date);
       const formatDate = dayjs(date).format("DD/MM/YYYY");
      setValues({ ...values, starting_date: formatDate });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };

    const endingDateFinder = () => {
      const startingDate = new Date(date);
      switch (values.period) {
        case "aylık":
          startingDate.setMonth(startingDate.getMonth() + 1);
          break;
        case "3 aylık":
          startingDate.setMonth(startingDate.getMonth() + 3);
          break;
        case "6 aylık":
          startingDate.setMonth(startingDate.getMonth() + 6);
          break;
        case "yıllık":
          startingDate.setFullYear(startingDate.getFullYear() + 1);
          break;
        default:
          console.log("Unknown license.");
      }
      setValues({ ...values, ending_date: dayjs(startingDate).format("DD/MM/YYYY") });
    };

    const onClick = (e) => {
        e.preventDefault();
        values.created_at = new Date();
        Toast.fire({
            title: "Lisans Ekleniyor...",
            text: "İşleniyor...",
            icon: "info",
          });
          LicenseManagerBrokerClient.CreateLicenseManagerLicense(values)
            .then(res => {          
              Toast.fire({
                title: "Lisans Eklendi!",
                text: "İşlem Başarılı.",
                icon: "success",
              });
    
              setTimeout(() => {
                navigate("/app/com.pedasoft.app.licensemanager/licenses/list");
              }, 1200);
              
            })
            .catch(err => {
              console.log(err)
              Toast.fire({
                title: "Lisans Eklenemedi!",
                text: "İşlem Başarısız.",
                icon: "error",
              });
            });
    };

    return HStack(
      ReactView(
        <PageContent
          path="Ana Sayfa > Lisans Yönetimi > Lisans Ekle"
          title="Lisans Ekle"
          content={
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: "50px" }}>
              <div style={{ backgroundColor: "#F5F5F5", display: "flex", width: "800px", height: "670px", flexDirection: "column" }}>


                <div style={{ display: "flex", width: "300px", height: "620px", margin: "0 auto", flexDirection: "column", marginTop: "20px" }}>
                  {/* select option müşteri */}

                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Adı</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="customer_id" onChange={onChange} defaultValue={"0"}>
                    <option disabled value="0">
                      Müşteri Seçiniz
                    </option>
                    {customers.map(customer => (
                      <option value={customer.id}>{customer.name}</option>
                    ))}
                  </select>

                  {/* select option lisans */}

                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Lisans Adı</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="app_id" onChange={onChange} defaultValue={"0"}>
                    <option disabled value="0">
                      Lisans Seçiniz
                    </option>
                  {licenseNames.map(license=><option value={license.id}>{license.name}</option>)}
                    
                  </select>

                  {/* Lisans Türü */}

                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Lisans Türü</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="type" onChange={onChange} defaultValue={"0"}>
                    <option disabled value="0">
                      Seçiniz
                    </option>
                    <option value={"Kiralama"}>Kiralama</option>
                    <option value={"Satın Alma"}>Satın Alma</option>
                  </select>

                  {/* Date Picker*/}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Lisans Başlama Tarihi</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={onDateChange}
                      slotProps={{
                        textField: {
                          size: "small",
                          style: { marginBottom: "30px", border: "1px solid rgb(118, 118, 118)", borderRadius: "8px" },
                        },
                      }}
                    />
                  </LocalizationProvider>

                  {/* Lisans Yenileme Periyodu */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Lisans Yenileme Periyodu</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="period" onChange={onChange} defaultValue={"0"}>
                    <option disabled value="0">
                      Seçiniz
                    </option>
                    <option value={"aylık"}>Aylık</option>
                    <option value={"3 aylık"}>3 Aylık</option>
                    <option value={"6 aylık"}>6 Aylık</option>
                    <option value={"yıllık"}>Yıllık</option>
                  </select>

                  {/* Buton */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                    <Button variant="contained" onClick={onClick} type="submit" style={{ width: "300px", height: "37px", color: "white", backgroundColor: "#3C8D40", border: "none", borderRadius: "8px", fontSize: "15px", textTransform: "none" }}>
                      Kaydet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )
    ).fontFamily("Poppins,sans-serif");
  }
}
