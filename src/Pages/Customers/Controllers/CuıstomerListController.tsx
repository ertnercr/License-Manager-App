import { HStack, ReactView, UIController, UIView, cTop, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import type { } from '@mui/x-data-grid/themeAugmentation';
import { Button, Typography } from "@mui/material";
import Navbar from "../../../components/Navbar";
import PageContent from "../../../components/PageContent";


export class CustomerListController extends UIController {

    public LoadView(): UIView {
        const navigate = useNavigate()
        return (
            HStack({ alignment: cTop })(
                ReactView(
                    <PageContent path="Ana Sayfa > Müşteri Yönetimi" title="Müşteri Listesi" content={
                        <div>
                            a
                        </div>
                    } />
                )
            ).fontFamily("Poppins,sans-serif")


        )

    }
}
