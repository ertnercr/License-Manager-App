import { HStack, ReactView, UIController, UIView, useNavigate } from '@tuval/forms';
import React from 'react'
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import type { } from '@mui/x-data-grid/themeAugmentation';
import EditIcon from '@mui/icons-material/Edit';
import { customerLicenseData } from '../../../assets/CustomerLicenseData';
import { Button, Typography, gridClasses } from "@mui/material";
import { colorPicker } from "../../../components/ColorPicker"
export class LicenseListController extends UIController {
    public LoadView(): UIView {

        const navigate = useNavigate()
        const rows: GridRowsProp = customerLicenseData.map((customer) => ({
            id: customer.customer_id,
            col1: customer.customer_name,
            col2: customer.licenses.map(item =>

                <div key={item.id} title={`Lisans Bitiş Tarihi: ${item.expire}`} style={{ display: "flex", justifyContent: "center", backgroundColor: `${colorPicker(item.name)}`, color: "white", height: "24px", alignItems: "center", paddingLeft: "5px", paddingRight: "5px", borderRadius: "4px", marginRight: "2.5px" }}> {item.name}  </div>),

            col3: customer.licenses.map(item => item.id),

        }));
        const columns: GridColDef[] = [
            { field: "id", headerName: "ID", width: 150, editable: true, disableColumnMenu: true },
            { field: 'col1', headerName: 'Customer Name', width: 220, editable: true, disableColumnMenu: true },
            { field: 'col2', headerName: 'Licences', width: 220, editable: true, sortable: false, disableColumnMenu: true, renderCell: (params) => <div style={{ display: "flex" }}>{params.value}</div>, },
            { field: "col3", headerName: "Licence Ids", width: 220, editable: true, disableColumnMenu: true },
            {
                field: 'actions',
                type: 'actions',
                width: 100,
                getActions: (e) => [
                    <GridActionsCellItem onClick={() => { navigate("/app/com.pedasoft.app.licensemanager/licenses/edit/" + e.id) }} icon={<EditIcon />} label="Edit" />,

                ],
            },
        ];

        return (
            HStack(
                ReactView(
                    <div style={{ width: "100%", height: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ height: "90%", width: '51%', display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Typography variant="h3" component='h3' sx={{ textAlign: "center", mt: 0.5, mb: 3 }}>Lisans Listesi</Typography>
                                    <div style={{ width: "38%", height: "100%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Button variant="contained" onClick={() => { navigate("/app/com.pedasoft.app.licensemanager/licenses/add") }} style={{ width: "115px", height: "36px", marginBottom: "10px", backgroundColor: "#3C8D40", textTransform: "none" }}>Lisans Ekle</Button>
                                    </div>
                                </div>
                                <DataGrid rows={rows} columns={columns} />
                            </div>
                        </div>
                    </div>
                )
            ).fontFamily("Poppins,sans-serif")
        )

    }
}