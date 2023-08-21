import { Button } from '@mui/material'
import { useNavigate } from '@tuval/forms'
import React ,{useState}from 'react'

type Props = {}

 function Navbar({}: Props) {
     const navigate=useNavigate()

    
  return (
    <div style={{display:"flex",width:"100%",height:"60px",backgroundColor:"#738694",alignItems:"center"}}>
        <div style={{display:"flex", width:"95%",alignItems:"center",justifyContent:"space-between"}}>
        <h2 style={{position:"relative",left:"30px",color:"whitesmoke",fontWeight:"500",fontSize:"20px"}}>License Manager</h2>
        <ul style={{display:"flex",listStyle:"none",color:"whitesmoke"}}>

            <li style={{paddingLeft:"7px",paddingRight:"7px"}}>
            <div onClick={()=>{navigate("/app/com.pedasoft.app.licensemanager/customers/list")}} style={{width:"150px",height:"35px",borderRadius:"5px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"14px"}}>Müşteri Yönetimi</div> 
            </li>


            <li style={{paddingLeft:"7px",paddingRight:"7px"}}>
            <div onClick={()=>{navigate("/app/com.pedasoft.app.licensemanager/licenses/list")}} style={{width:"150px",height:"35px",borderRadius:"5px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"14px"}}>Lisans Yönetimi</div>
            </li>

            <li style={{paddingLeft:"7px",paddingRight:"7px"}}>
            <div style={{width:"163px",height:"35px",borderRadius:"5px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"14px"}}>Müşteri-Lisans İşlemleri</div>
            </li>
        </ul>
        </div>
    </div>
  )
}
export default Navbar