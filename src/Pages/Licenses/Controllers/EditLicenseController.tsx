import { HStack, ReactView, UIController, UIView } from '@tuval/forms';
import React from 'react'



export class EditLicenseController extends UIController{
    public LoadView(): UIView {


        return(
            HStack(
                ReactView(
                    <div>a</div>
                )
            )
        )

    }
}