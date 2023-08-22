import { HStack, ReactView, UIController, UIView } from '@tuval/forms';
import React,{useState,useEffect} from 'react'
import Toast from '../../../components/Toast';
import { Button} from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Navbar from '../../../components/Navbar';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export class AddLicenseController extends UIController{
    public LoadView(): UIView {
        interface Values {
            customer_name: string;
            license_name: string;
            license_starting_date: string;
            license_ending_date: string;
            license_type:string;
            period:string;
            is_active:boolean;
            
          }
        const [date,setDate]=useState()
        const [values,setValues]=useState({
            customer_name:"",
            license_name:"",
            license_starting_date:"",
            license_ending_date:"",
            license_type:"",
            is_active:true,
            period:"",

        })

        const handleSwitchChange = (e) => {
            const { checked } = e.target
      
            setValues((prevStates) => ({ ...prevStates, isActive: checked }))
        }

        const handleDate = (date) => {
            setDate(date);
            const formatDate = dayjs(date).format("DD/MM/YYYY");
            setValues({ ...values, license_starting_date: formatDate });
            
          };
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value} = e.target; 
   
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };



  const endingDateFinder=()=>{
    const startingDate=new Date(date)
    switch (values.period) {
        case 'aylık':
            startingDate.setMonth(startingDate.getMonth() + 1);
            break;
        case '3 aylık':
            startingDate.setMonth(startingDate.getMonth() + 3);
            break;
        case '6 aylık':
            startingDate.setMonth(startingDate.getMonth() + 6);
            break;
        case 'yıllık':
            startingDate.setFullYear(startingDate.getFullYear() + 1);
            break;
        default:
          console.log('Unknown license.');
      }

      setValues({...values,license_ending_date:dayjs(startingDate).format("DD/MM/YYYY")})
    }




    useEffect(() => {
        endingDateFinder()
      
    }, [values.period])
    


  const onClick=()=>{
    console.log(values)
    Toast.fire({
        title:"Lisans Eklendi",
        text:"Lisans Kaydı Başarıyla Tamamlandı.",
        icon:"success"
    })
  }



        return(
            HStack(
                ReactView(
                    <div style={{width:"100%",height:"100%"}}>
                    <Navbar pageName={"Müşteri Listesi"} />
                     
                     <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"flex-start",marginTop:"50px"}}>  
                  <div style={{backgroundColor:"#F5F5F5",display:"flex",width:"800px",height:"670px",flexDirection:"column"}}> 
                <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center"}}>
                 <h2 style={{color:"#5C5C5C",fontWeight:"500",marginTop:"20px"}}>Lisans Tanımlama</h2>
             </div>



             <div style={{display:"flex",width:"300px",height:"620px",margin:"0 auto",flexDirection:"column",marginTop:"20px",}}>

                               {/* select option müşteri */}
                                
            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Müşteri Adı
            </label>
            <select  style={{width:"303px",height:"39px",paddingLeft:"5px",marginBottom:"30px",borderRadius:"8px"}} name="customer_name" onChange={onChange} defaultValue={"0"}>
            <option disabled value="0">Müşteri Seçiniz</option>
            {/* {customerLicenseData.map(item=>
            <option value={item.customer_name}>{item.customer_name}</option>
            )} */}
            </select>


                                {/* select option lisans */}

            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Lisans Adı
            </label>        
            <select  style={{width:"303px",height:"39px",paddingLeft:"5px",marginBottom:"30px",borderRadius:"8px"}} name="license_name" onChange={onChange} defaultValue={"0"}>
            <option disabled value="0">Lisans Seçiniz</option>
            <option value={"lisans1"}>lisans 1</option>
            <option value={"lisans2"}>lisans 2</option>
            <option value={"lisans3"}>lisans 3</option>
            <option value={"lisans4"}>lisans 4</option>
            <option value={"lisans5"}>lisans 5</option>
            
            </select>


                                {/* Lisans Türü */}    

            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Lisans Türü
            </label>        
            <select  style={{width:"303px",height:"39px",paddingLeft:"5px",marginBottom:"30px",borderRadius:"8px"}} name="license_type" onChange={onChange} defaultValue={"0"}>
            <option disabled value="0">Seçiniz</option>
            <option value={"kiralama"}>Kiralama</option>
            <option value={"satın alma"}>Satın Alma</option>

            </select>



                                {/* Date Picker*/}

            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Lisans Başlama Tarihi
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker
                format='DD/MM/YYYY'
                value={date}
                onChange={handleDate} 
                slotProps={{
                    textField: {
                      size: "small",
                      style:{marginBottom:"30px",border:"1px solid rgb(118, 118, 118)",borderRadius:"8px"}
                    },
                  }}
                /> */}
              </LocalizationProvider>

                                

                 {/* Lisans Yenileme Periyodu */}    
            <label style={{fontWeight:"500",fontSize:"13px",color:"#5C5C5C",marginBottom:"8px"}}>
                Lisans Yenileme Periyodu
            </label>        
            <select  style={{width:"303px",height:"39px",paddingLeft:"5px",marginBottom:"30px",borderRadius:"8px"}} name="period" onChange={onChange} defaultValue={"0"}>
            <option disabled value="0">Seçiniz</option>
            <option value={"aylık"}>Aylık</option>
            <option value={"3 aylık"}>3 Aylık</option>
            <option value={"6 aylık"}>6 Aylık</option>
            <option value={"yıllık"}>Yıllık</option>

            </select>


                               {/* Switch */}
            <div style={{display:"flex", justifyContent:"flex-end",marginTop:"30px",alignItems:"center"}}> 
            <label style={{fontSize:"13px",marginRight:"10px",fontWeight:"500",color:"#5C5C5C",}}>Aktif/Pasif</label>
            <Switch name="is_active"  onChange={handleSwitchChange} defaultChecked/>
            </div>


                                {/* Buton */}
            <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
                <Button variant="contained" onClick={onClick} type='submit' style={{width:"300px",height:"37px",color:"white",backgroundColor:"#3C8D40",border:"none",borderRadius:"8px",fontSize:"15px",textTransform:"none"}}>Kaydet</Button>
            </div>
            </div>
             </div>
             </div>
             </div>
                )
            ).fontFamily("Poppins,sans-serif")
        )

    }
}