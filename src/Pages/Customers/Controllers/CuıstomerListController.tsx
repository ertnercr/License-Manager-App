import { HStack, ReactView, UIController, UIView, useNavigate } from "@tuval/forms";
import React,{useState} from "react";
import { DataGrid,GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import EditIcon from '@mui/icons-material/Edit';
import {customerData} from "../../../assets/CustomerData"
import { Button, Typography, gridClasses } from "@mui/material";
import Navbar from "../../../components/Navbar";


export class CustomerListController extends UIController{
  
    public LoadView(): UIView {
        const navigate=useNavigate()
        const rows: GridRowsProp = customerData.map((customer) => ({
            id: customer.id,
            col1: customer.fullName,
            col2: customer.email,
            col3:customer.tenantId,
            col4:customer.isActive,
}));

        const columns: GridColDef[] = [
            {field:"id",headerName:"ID",width:150,editable:true,disableColumnMenu:true},
            {field: 'col1', headerName: 'Customer Name', width: 220,editable:true ,disableColumnMenu:true},
            {field: 'col2', headerName: 'Customer e-mail', width: 220,editable:true,sortable:false,disableColumnMenu:true },
            {field:"col3",headerName:"Tenant ID",width:220,editable:true,disableColumnMenu:true},
            {field:"col4",headerName:"Active/Passive",width:220,type:"boolean",editable:true,disableColumnMenu:true},
            {
                field: 'actions',
                type: 'actions',
                width: 100,
                getActions: (e) => [
                  <GridActionsCellItem onClick={()=>{navigate("/app/com.pedasoft.app.licensemanager/licenses/edit/"+e.id)}} icon={<EditIcon />} label="Edit" />,
                 
                ],
              },
                    ];

                    
        return(
        HStack(
            ReactView(
                <div style={{width:"100%",height:"100%"}}>
               
                <Navbar/>
                
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center"}}>
                    
                    <div style={{ height: "90%", width: '70%',marginTop:"40px",display:"flex",flexDirection:"column"}}>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                          
                            <Typography variant="h3" component='h3' sx={{textAlign:"center",mt:3,mb:3}}>Müşteri Listesi </Typography>
                            <div style={{width:"38%",height:"100%",display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}}>
                            <Button variant="contained" onClick={()=>{navigate("/app/com.pedasoft.app.licensemanager/customers/add")}} style={{width:"115px",height:"36px",marginBottom:"10px",backgroundColor:"#3C8D40",textTransform:"none"}}>Müşteri Ekle</Button>
                            </div>
                            
                        
                        </div>
                        
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                    
                    
                </div>
                </div>
            )
        ).fontFamily("Poppins,sans-serif")
        
        
        )

    }}
