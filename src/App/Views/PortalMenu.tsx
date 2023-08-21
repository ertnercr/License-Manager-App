import { HStack, ReactView } from "@tuval/forms"
import Navbar from "../../components/Navbar"
import React from "react"

export const PortalMenu = (pageName: string) => {
    return (
        HStack(
            ReactView(
                <Navbar pageName={pageName} />
            )
        ).height("60px").minHeight("60px").width("100%")
    )
}