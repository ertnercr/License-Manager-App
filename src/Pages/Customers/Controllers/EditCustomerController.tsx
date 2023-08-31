import { HStack, ReactView, Spinner, UIController, UIView, cTop, useNavigate } from "@tuval/forms";
import React, { useState, useEffect } from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Button } from "@mui/material";
import Toast from "../../../components/Toast";

import { LicenseManagerBrokerClient } from "../../../api/LicenseManagerBrokerClient";
import { ICustomer } from "../../../types/Interfaces";
import { useOrgProvider } from "@realmocean/common";
import PageContent from "../../../components/PageContent";

export class EditCustomerController extends UIController {
  private id: string;
  protected BindRouterParams({ id }) {
    this.id = id;
    console.log(id);
  }

  public LoadView(): UIView {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<ICustomer>();
    const [tenants, setTenants] = useState<{ text: string; value: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deleteButton, setDeleteButton] = useState<boolean>(false);

    useEffect(() => {

      Promise.all([LicenseManagerBrokerClient.GetLicenseManagerCustomerById(this.id), useOrgProvider().getTenants()])
        .then(res => {
          const [customerById, allTenants] = res;
         
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
          setCustomer(customerById);
          console.log(customerById)
          

          //apiden gelen veriye göre delete butonunun görünürlüğü
          if (customerById.is_active === false) {
            setDeleteButton(true);
          }

          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          alert("Müşteriler getirilemedi!");
        });
    }, []);


    const handleCheckboxChange = (e) => {
      const { checked } = e.target;
      setCustomer({ ...customer, is_active: checked });
     
    };


    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setCustomer(prevValues => ({ ...prevValues, [name]: value }));
    };


    const onClick = e => {
      e.preventDefault();

      const updateCustomer = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        customer_tenant_id: customer.customer_tenant_id,
        is_active: customer.is_active,
        updated_at: new Date().toString(),
      };
      LicenseManagerBrokerClient.UpdateLicenseManagerCustomer(updateCustomer)
        .then(res => {
          Toast.fire({
            title: "Müşteri Güncellendi!",
            text: "İşlem Başarılı.",
            icon: "success",
          });

        /*   setTimeout(() => { */
            navigate("/app/com.pedasoft.app.licensemanager/customers/list");
        /*   }, 1500); */
          
        })
        .catch(err => {
          console.log("hata:", err);

          Toast.fire({
            title: "Müşteri Eklenemedi!",
            text: "İşlem Başarısız.",
            icon: "error",
          });

        });
    };
    const onDeleteClick = () => {
      const deleteDate=new Date()
      LicenseManagerBrokerClient.DeleteLicenseManagerCustomer(this.id,deleteDate)
      .then(res => {
        Toast.fire({
          title: "Müşteri Silindi!",
          text: "Müşteri Başarıyla Silindi.",
          icon: "success",
        });

       /*  setTimeout(() => { */
          navigate("/app/com.pedasoft.app.licensemanager/customers/list");
      /*   }, 1500); */
        
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
    

    return HStack({ alignment: cTop })(
      isLoading
        ? Spinner()
        : ReactView(
            <PageContent
              path="Ana Sayfa > Müşteri Yönetimi > Müşteri Düzenleyin"
              title="Müşteri Bilgilerini Düzenleme"
              content={
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ backgroundColor: "#F5F5F5", display: "flex", width: "800px", height: "700px", flexDirection: "column" }}>
                    <div style={{ display: "flex", width: "100%", height: "100px", justifyContent: "center", alignItems: "center" }}></div>
                    <div style={{ display: "flex", width: "300px", height: "550px", margin: "0 auto", flexDirection: "column", marginTop: "20px" }}>

                      {/* tenant id input */}
                      <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>TenantID</label>
                      <input type="text" id="musteri-ad-soyad" name="tenant_id" value={customer.tenant_id} onChange={onChange} style={{ width: "295px", height: "35px", marginBottom: "30px", border: "1px solid  rgb(133, 133, 133)", borderRadius: "8px", paddingLeft: "8px" }} />

                      {/* ad soyad input */}
                      <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Sorumlusu Ad-Soyad</label>
                      <input type="text" id="musteri-ad-soyad" name="name" placeholder="Ad Soyad Giriniz..." value={customer.name} onChange={onChange} style={{ width: "295px", height: "35px", marginBottom: "30px", border: "1px solid  rgb(133, 133, 133)", borderRadius: "8px", paddingLeft: "8px" }} />

                      {/* email input */}
                      <label style={{ fontWeight: "500", fontSize: "13px", color: "#5C5C5C", marginBottom: "8px" }}>Müşteri Sorumlusu e-mail</label>
                      <input type="email" placeholder="E-mail giriniz" id="musteri-mail" name="email" value={customer.email} onChange={onChange} style={{ width: "295px", height: "35px", border: "1px solid  rgb(133, 133, 133)", borderRadius: "8px", paddingLeft: "8px" }} />

                      {/* Switch */}
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px", alignItems: "center" }}>
                        <label style={{ fontSize: "13px", marginRight: "10px", fontWeight: "500", color: "#5C5C5C" }}>Aktif/Pasif</label>
                        <Switch name="is_active" checked={customer.is_active} onChange={handleCheckboxChange}/>
                      </div>

                      {/* Kaydet Buton */}
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
    ).fontFamily("Poppins,sans-serif");
  }
}
