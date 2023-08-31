import { HStack, ReactView, Spinner, UIController, UIView, cTop, useNavigate } from "@tuval/forms";
import React, { useState, useEffect } from "react";
import { Button, Switch } from "@mui/material";
import Toast from "../../../components/Toast";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { ICustomer, ILicense } from "../../../types/Interfaces";
import { useOrgProvider } from "@realmocean/common";
import PageContent from "../../../components/PageContent";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {licenseNames} from "../../../assets/licenses"
import dayjs from "dayjs";

export class EditLicenseController extends UIController{
    private id: string;
    protected BindRouterParams({ id }) {
      this.id = id;
      console.log(id);
    }

    //BAŞLANGIÇ TARİHİ AYARLANMADI HALA
    public LoadView(): UIView {
    const navigate = useNavigate();
    const [license, setLicense] = useState<ILicense>();
    const [customer, setCustomer] = useState<ICustomer[]>([]);
    const [tenants, setTenants] = useState<{ text: string; value: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deleteButton, setDeleteButton] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    useEffect(() => {

        Promise.all([LicenseManagerBrokerClient.GetLicenseManagerLicenseById(this.id), useOrgProvider().getTenants(),LicenseManagerBrokerClient.GetAllLicenseManagerCustomers()])
          .then(res => {
            const [licenseById, allTenants,customers] = res;
            
            if (tenants.length > 0) {
              const tenantList = allTenants.map(tenant => {
                return {
                  value: tenant.Id,
                  text: tenant.Name,
                };
              });
              setTenants(tenantList);
            } else {
              setTenants([
                { value: "1", text: "Tenant 1" },
                { value: "2", text: "Tenant 2" },
              ]);
            }
            //Api verisini state içine yollama
            setLicense(licenseById);
            setCustomer(customers)
            /* setDate(new Date(license.starting_date)) */  //Editte date pickera son seçili tarihin seçilmiş olarak gelmesini sağlamaya çalıştım ama yapamadım.

            //apiden gelen veriye göre delete butonunun görünürlüğü
            if (licenseById.is_active === false) {
              setDeleteButton(true);
            }
  
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
            alert("Lisans getirilemedi!");
          });
      }, []);
      



      const handleCheckboxChange = e => {
        const { checked } = e.target;
        setLicense(prevStates => ({ ...prevStates, is_active: checked }));
        
      };
  
  
      const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLicense(prevValues => ({ ...prevValues, [name]: value }));
        if (name==="period"){
            endingDateFinder()    
        }
      };

      const onClick = e => {
        e.preventDefault();
        
        const updateLicense = {
          id: license.id,
          customer_id:license.customer_id,
          app_id: license.app_id,
          period: license.period,
          starting_date:license.starting_date,
          ending_date:license.ending_date,
          type:license.type,
          is_active: license.is_active,
          updated_at: new Date(),
        };
        LicenseManagerBrokerClient.UpdateLicenseManagerLicense(updateLicense)
          .then(res => {
            Toast.fire({
              title: "Lisans Güncellendi!",
              text: "İşlem Başarılı.",
              icon: "success",
            });
  
            setTimeout(() => {
              navigate("/app/com.pedasoft.app.licensemanager/licenses/list");
            }, 1500);
          })
          .catch(err => {
            console.log("hata:", err);
  
            Toast.fire({
              title: "Lisans Güncellenemedi!",
              text: "İşlem Başarısız.",
              icon: "error",
            });
  
          });
      };

      const onDeleteClick = () => {
        const deleteDate=new Date()
        LicenseManagerBrokerClient.DeleteLicenseManagerLicense(this.id,deleteDate)
        .then(res => {
          Toast.fire({
            title: "Müşteri Silindi!",
            text: "Müşteri Başarıyla Silindi.",
            icon: "success",
          });
  
          setTimeout(() => {
            navigate("/app/com.pedasoft.app.licensemanager/licenses/list");
          }, 1500);
          
        })
        .catch(err => {
          console.log("hata:", err);
  
          Toast.fire({
            title: "Müşteri Silinemedi!",
            text: "Bir Sorun Oluştu.",
            icon: "error",
          });
        });
      };

      const onDateChange = (date: Date) => {
        setDate(date);
         const formatDate = dayjs(date).format("DD/MM/YYYY");
        setLicense({ ...license, starting_date:formatDate });
      };

      const endingDateFinder = () => {
        const startingDate = new Date(date);
        switch (license.period) {
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
        setLicense({ ...license, ending_date: dayjs(startingDate).format("DD/MM/YYYY") });
      };

        return(
            HStack(
                isLoading ?
                 Spinner()
                : 
                ReactView(
                   <PageContent
          path="Ana Sayfa > Lisans Yönetimi > Lisans Düzenleme"
          title="Lisans Düzenleme"
          content={
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: "50px" }}>
              <div style={{ backgroundColor: "#F5F5F5", display: "flex", width: "800px", height: "670px", flexDirection: "column" }}>
                <div style={{ display: "flex", width: "300px", height: "620px", margin: "0 auto", flexDirection: "column", marginTop: "20px" }}>


                  {/* select option müşteri */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Adı</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="customer_id" onChange={onChange} defaultValue={license.customer_id}>
                    <option disabled value="0">
                      Müşteri Seçiniz
                    </option>
                    {customer.map(customer => (
                      <option value={customer.id}>{customer.name}</option>
                    ))}
                  </select>


                  {/* select option lisans */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Lisans Adı</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="app_id" onChange={onChange} defaultValue={license.app_id}>
                    <option disabled value="0">
                      Lisans Seçiniz
                    </option>
                    {licenseNames.map(license => (
                      <option value={license.id}>{license.name}</option>
                    ))
                    }
                  </select>



                  {/* Lisans Türü */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Lisans Türü</label>
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="type" onChange={onChange} defaultValue={license.type}>
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
                  <select style={{ width: "303px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="period" onChange={onChange} defaultValue={license.period}>
                    <option disabled value="0">
                      Seçiniz
                    </option>
                    <option value={"aylık"}>Aylık</option>
                    <option value={"3 aylık"}>3 Aylık</option>
                    <option value={"6 aylık"}>6 Aylık</option>
                    <option value={"yıllık"}>Yıllık</option>
                  </select>
                  

                  {/* Aktif/Pasif */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px", alignItems: "center" }}>
                        <label style={{ fontSize: "13px", marginRight: "10px", fontWeight: "500", color: "#5C5C5C" }}>Aktif/Pasif</label>
                        <Switch name="is_active" checked={license.is_active} onChange={handleCheckboxChange}/>
                      </div>

                  {/* Buton */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                    <Button variant="contained" onClick={onClick} type="submit" style={{ width: "300px", height: "37px", color: "white", backgroundColor: "#3C8D40", border: "none", borderRadius: "8px", fontSize: "15px", textTransform: "none" }}>
                      Kaydet
                    </Button>
                  </div>

                  
                  {/* Delete Button */}
                  {deleteButton && (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                          <Button variant="contained" onClick={onDeleteClick} type="submit" color="error" style={{ width: "300px", height: "37px", border: "none", borderRadius: "8px", fontSize: "15px", textTransform: "none" }}>
                            Müşteriyi Sil
                          </Button>
                        </div>
                      )}
                </div>
              </div>
            </div>
          }
        />
                )
            ).fontFamily("Poppins,sans-serif")
        )

    }
}