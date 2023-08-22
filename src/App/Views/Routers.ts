import { UIRoute, UIRoutes } from '@tuval/forms'
import React from 'react'
import { CustomersController } from '../../Pages/Customers/Controllers/CustomersController'
import { AddCustomerController } from '../../Pages/Customers/Controllers/AddCustomerController'
import { LayoutController } from '../Controllers/Layout'
import { CustomerListController } from '../../pages/Customers/Controllers/CustomerListController'
import { EditCustomerController } from '../../Pages/Customers/Controllers/EditCustomerController'
import { LicenseController } from '../../Pages/Licenses/Controllers/LicenseController'
import { LicenseListController } from '../../Pages/Licenses/Controllers/LicenseListController'
import { AddLicenseController } from '../../Pages/Licenses/Controllers/AddLicenseController'
import { EditLicenseController } from '../../Pages/Licenses/Controllers/EditLicenseController'



export const Routers = () => {
  return UIRoutes(
    UIRoute("/",LayoutController).children(
        UIRoute("customers",CustomersController).children(
            UIRoute("add",AddCustomerController),
            UIRoute('list', CustomerListController),
            UIRoute('edit/:id', EditCustomerController),
        ),
        UIRoute("licenses",LicenseController).children(
            UIRoute("list",LicenseListController),
            UIRoute("add",AddLicenseController),
            UIRoute('edit/:id', EditLicenseController),
        )
    ),
   
  )
}

