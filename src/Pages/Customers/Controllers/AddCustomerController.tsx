import { HStack, ReactView, UIController, UIView, cTop, useNavigate, useEffect } from '@tuval/forms'
import React, { useState } from 'react'
import Toast from '../../../components/Toast'
import PageContent from '../../../components/PageContent'
import TextInput from '../../../components/TextInput'
import SelectInput from '../../../components/SelectInput'
import SubmitButton from '../../../components/SubmitButton'
import { ITenant, useOrgProvider } from "@realmocean/common";
import { LicenseManagerBrokerClient } from '../../../api/LicenseManagerBrokerClient'

interface IValues {
  customer_tenant_id: string
  name: string
  email: string
  created_at: Date
}

const valuesParam: IValues = {
  customer_tenant_id: '',
  name: '',
  email: '',
  created_at: new Date(),
}

export class AddCustomerController extends UIController {

  public LoadView(): UIView {

    const navigate = useNavigate()

    const [values, setValues] = useState<IValues>(valuesParam)

    const [tenants, setTenants] = useState<{ value: string, text: string }[]>([])

    useEffect(() => {
      const useOrgProv = useOrgProvider()
      Promise.all([
        useOrgProv.getTenants(),
      ]).then((res) => {
        const [tenants] = res
        if (tenants.length > 0) {
          const tenantList = tenants.map((tenant) => {
            return {
              value: tenant.Id,
              text: tenant.Name
            }
          })
          setTenants(tenantList)
        } else {
          setTenants([{ value: '1', text: 'Tenant 1' }, { value: '2', text: 'Tenant 2' }])
        }
      })
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setValues({ ...values, [name]: value })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      values.created_at = new Date()
      Toast.fire({
        title: 'Müşteri Ekleniyor...',
        text: 'İşleniyor...',
        icon: 'info',
      })
      LicenseManagerBrokerClient.CreateLicenseManagerCustomer(values).then((res) => {
        Toast.fire({
          title: 'Müşteri Eklendi!',
          text: 'İşlem Başarılı.',
          icon: 'success',
        })
        navigate('/app/com.pedasoft.app.licensemanager/customers/list')
      }).catch((err) => {
        Toast.fire({
          title: 'Müşteri Eklenemedi!',
          text: 'İşlem Başarısız.',
          icon: 'error',
        })
      })
    }

    return (
      HStack({ alignment: cTop })(
        ReactView(
          <PageContent
            path='Ana Sayfa > Müşteri Yönetimi > Müşteri Ekle'
            title='Müşteri Ekle'
            content={
              <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                {/* CREATE CUSTOMER FORM */}
                <form style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={onSubmit}>
                  <SelectInput label="Tenant" name='customer_tenant_id' value={values.customer_tenant_id} options={tenants} onChange={onChange} />
                  <TextInput label="Müşteri Adı" name='name' value={values.name} onChange={onChange} />
                  <TextInput label="Müşteri Email" name='email' value={values.email} onChange={onChange} />
                  <div style={{ width: "50%", }}>
                    <SubmitButton type="submit">Kaydet</SubmitButton>
                  </div>
                </form>
              </div>
            }
          />
        )
      )
    )
  }
}
