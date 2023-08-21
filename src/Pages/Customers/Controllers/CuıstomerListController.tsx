import { HStack, ReactView, UIController, UIView, cTop, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import type { } from '@mui/x-data-grid/themeAugmentation';
import { Button, Typography } from "@mui/material";
import Navbar from "../../../components/Navbar";


export class CustomerListController extends UIController {

    public LoadView(): UIView {
        const navigate = useNavigate()
        return (
            HStack({ alignment: cTop })(
                ReactView(
                    <div style={{ width: "100%", height: "100%" }}>
                        <Navbar pageName={"Müşteri Yönetimi"} />
                        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                            <div style={{ height: "90%", width: '70%', marginTop: "40px", display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>

                                    <Typography variant="h3" component='h3' sx={{ textAlign: "center", mt: 3, mb: 3 }}>Müşteri Listesi </Typography>
                                    <div style={{ width: "38%", height: "100%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Button variant="contained" onClick={() => { navigate("/app/com.pedasoft.app.licensemanager/customers/add") }} style={{ width: "115px", height: "36px", marginBottom: "10px", backgroundColor: "#3C8D40", textTransform: "none" }}>Müşteri Ekle</Button>
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
