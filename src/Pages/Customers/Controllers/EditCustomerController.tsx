import { ReactView, UIController, UIView, VStack } from "@tuval/forms";
import React,{useState,useEffect} from "react";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Button } from "@mui/material";
import Toast from "../../../components/Toast";
import {customerData} from "../../../assets/CustomerData"
import Navbar from "../../../components/Navbar";





export class EditCustomerController extends UIController{

    private id:string;


    protected BindRouterParams({id}){
        this.id=id
        console.log(id)
        return true;
    }

   
    public x=0
    public LoadView():UIView{
    
     
       
        
        interface Values {
            Tenant: string;
            Customer_Manager_Name: string;
            Customer_Manager_eMail: string;
            isActive: boolean;
          }

        const [values,setValues]=useState({
            Tenant:"",
            Customer_Manager_Name:"",
            Customer_Manager_eMail:"",
            isActive:true,

        })
       
        useEffect(() => {
            const filteredData = customerData.filter((customer) => customer.id ===this.id)
            this.x=this.x+1
            console.log(this.x," kere çalıştım")
           setValues({
            Tenant:filteredData[0].tenantId,
            Customer_Manager_Name:filteredData[0].fullName,
            Customer_Manager_eMail:filteredData[0].email,
            isActive:filteredData[0].isActive,
           })          
          }, [this.id])

        const handleCheckboxChange = (e) => {
            const { checked } = e.target
            setValues((prevStates) => ({ ...prevStates, isActive: checked }))
          }
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target; 
   
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    
  };
  const onClick=()=>{
    Toast.fire({
        title:"Güncelleme Başarılı",
        text:"Müşteri Bilgileri Başarıyla Güncellendi.",
        icon:"success"
    })
    console.log(values)
  }
  const onDeleteClick=()=>{
    Toast.fire({
        title:"Silme İşlemi Başarılı",
        text:"Müşteri Başarıyla Listeden Kaldırıldı.",
        icon:"error"
    })
    console.log(values)
  }
        return(
            VStack(

                ReactView(
                            <div style={{width:"100%",height:"100%"}}>
                                <Navbar />
                          
                                 
                            
                    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>  
                    
                    <div style={{backgroundColor:"#F5F5F5",display:"flex",width:"800px",height:"700px",flexDirection:"column"}}> 
                  <div style={{display:"flex",width:"100%",height:"100px",justifyContent:"center",alignItems:"center"}}>
                   <h2 style={{color:"#5C5C5C",fontWeight:"500"}}>Müşteri Bilgilerini Düzenleme</h2>
               </div>
               <div style={{display:"flex",width:"300px",height:"550px",margin:"0 auto",flexDirection:"column",marginTop:"20px",}}>

                                                    {/* tenant id input */}
            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                TenantID
            </label>
            <input type="text" id='musteri-ad-soyad' name="Tenant" value={values.Tenant} onChange={onChange} style={{width:"295px",height:"35px",marginBottom:"30px",border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />


                                                    {/* ad soyad input */}
              <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Müşteri Sorumlusu Ad-Soyad
            </label>
            <input type="text" id='musteri-ad-soyad' name="Customer_Manager_Name" placeholder='Ad Soyad Giriniz...' value={values.Customer_Manager_Name} onChange={onChange} style={{width:"295px",height:"35px",marginBottom:"30px",border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />


                                {/* email input */}
            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Müşteri Sorumlusu e-mail
            </label>
            <input type="email" placeholder='E-mail giriniz' id='musteri-mail' name="Customer_Manager_eMail"  value={values.Customer_Manager_eMail} onChange={onChange}  style={{ width:"295px",height:"35px",border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />
            
                                {/* Switch */}
            <div style={{display:"flex", justifyContent:"flex-end",marginTop:"30px",alignItems:"center"}}> 
            <label style={{fontSize:"13px",marginRight:"10px",fontWeight:"500",color:"#5C5C5C",}}>Aktif/Pasif</label>
            <Switch name="isActive" checked={values.isActive} onChange={handleCheckboxChange} defaultChecked/>
            </div>


                                {/* Kaydet Buton */}
            <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
                <Button variant="contained" onClick={onClick} type='submit' style={{width:"300px",height:"37px",color:"white",backgroundColor:"#3C8D40",border:"none",borderRadius:"8px",fontSize:"15px",textTransform:"none"}}>Kaydet</Button>
            </div>
                            {/* Delete Button */}
            {values.isActive &&
            <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
                <Button variant="contained" onClick={onDeleteClick} type='submit' color="error" style={{width:"300px",height:"37px",border:"none",borderRadius:"8px",fontSize:"15px",textTransform:"none"}}>Müşteriyi Sil</Button>
            </div>
        }
</div>
                    </div>
                    </div>
                    </div>
                    

                )
            ).fontFamily("Poppins,sans-serif")
        )
    }
}