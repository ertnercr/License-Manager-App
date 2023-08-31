import { HStack, ReactView, UIController, UIView, cTop, useNavigate, useEffect, Spinner } from "@tuval/forms";
import React, { useState } from "react";
import Toast from "../../../components/Toast";
import PageContent from "../../../components/PageContent";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import SubmitButton from "../../../components/SubmitButton";
import { ITenant, useOrgProvider } from "@realmocean/common";
import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Button } from "@mui/material";

interface IValues {
  customer_tenant_id: string;
  name: string;
  email: string;
  created_at: Date;
  is_active:boolean;
}

const valuesParam: IValues = {
  customer_tenant_id: "",
  name: "",
  email: "",
  created_at: new Date(),
  is_active:true,
};

export class AddCustomerController extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate();

    const [values, setValues] = useState<IValues>(valuesParam);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tenants, setTenants] = useState<{ value: string; text: string }[]>([]);

    useEffect(() => {
      const useOrgProv = useOrgProvider();
      Promise.all([useOrgProv.getTenants()]).then(res => {
        const [tenants] = res;
        if (tenants.length > 0) {
          const tenantList = tenants.map(tenant => {
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
        setIsLoading(false)
      });
    }, []);

   

    const onClick = (e) => {
      e.preventDefault();
      values.created_at = new Date();
      Toast.fire({
        title: "Müşteri Ekleniyor...",
        text: "İşleniyor...",
        icon: "info",
      });
      LicenseManagerBrokerClient.CreateLicenseManagerCustomer(values)
        .then(res => {
          
          
          Toast.fire({
            title: "Müşteri Eklendi!",
            text: "İşlem Başarılı.",
            icon: "success",
          });

          setTimeout(() => {
            navigate("/app/com.pedasoft.app.licensemanager/customers/list");
          }, 1200);
          
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            title: "Müşteri Eklenemedi!",
            text: "İşlem Başarısız.",
            icon: "error",
          });
        });
    };

    const handleCheckboxChange = e => {
      const { checked } = e.target;
      setValues( { ...values, is_active: checked });
    };



    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      setValues({ ...values, [name]: value });
    };

    return HStack({ alignment: cTop })(
      isLoading
        ? Spinner()
        : 
      ReactView(
        <PageContent
          path="Ana Sayfa > Müşteri Yönetimi > Müşteri Ekle"
          title="Müşteri Ekle"
          content={
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ backgroundColor: "#F5F5F5", display: "flex", width: "800px", height: "700px", flexDirection: "column" }}>
                <div style={{ display: "flex", width: "296px", height: "550px", margin: "0 auto", flexDirection: "column", marginTop: "20px" }}>
                  
                  
                                      {/* Tenant */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Firma</label>
                  <select style={{ width: "296px", height: "39px", paddingLeft: "5px", marginBottom: "30px", borderRadius: "8px" }} name="customer_tenant_id"  id="musteri-firma" onChange={onChange} defaultValue={"0"}>
                      {tenants.map((tenant)=>
                        <option value={tenant.value}>{tenant.text}</option>
                      )}
                  </select>

                                    {/* ad soyad  */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Sorumlusu Ad-Soyad</label>
                  <input type="text" id="musteri-ad-soyad" name="name" placeholder="Ad Soyad Giriniz..." onChange={onChange} style={{ width: "295px", height: "35px", marginBottom: "30px", border: "1px solid  rgb(133, 133, 133)", borderRadius: "8px", paddingLeft: "8px" }} />

                                    {/* Email */}
                  <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Sorumlusu e-mail</label>
                  <input type="email" placeholder="E-mail giriniz" id="musteri-mail" name="email" onChange={onChange} style={{ width: "295px", height: "35px", border: "1px solid  rgb(133, 133, 133)", borderRadius: "8px", paddingLeft: "8px" }} />

                                    {/* Aktif Pasif Switch */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px", alignItems: "center" }}>
                    <label style={{ fontSize: "13px", marginRight: "10px", fontWeight: "500", color: "#5C5C5C" }}>Aktif/Pasif</label>
                    <Switch name="is_active" onChange={handleCheckboxChange} defaultChecked />
                  </div>

                  {/* Ekle Buton */}
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
