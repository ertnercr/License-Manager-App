import { HStack, ReactView, UIController, UIView } from '@tuval/forms'
import React, { useState } from 'react'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { Button } from '@mui/material'
import Toast from '../../../components/Toast'
import Navbar from '../../../components/Navbar'

interface IValues {
  tenant_id: string
  customer_manager_name: string
  customer_manager_email: string
  is_active: boolean
}

const valuesParam: IValues = {
  tenant_id: '',
  customer_manager_name: '',
  customer_manager_email: '',
  is_active: true,
}

export class AddCustomerController extends UIController {
  public LoadView(): UIView {
    const [values, setValues] = useState<IValues>(valuesParam)
    const handleCheckboxChange = (e) => {
      const { checked } = e.target

      setValues((prevStates) => ({ ...prevStates, isActive: checked }))
    }
    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target

      setValues((prevValues) => ({ ...prevValues, [name]: value }))
    }
    const onClick = () => {
      Toast.fire({
        title: 'Müşteri Eklendi',
        text: 'Müşteri Başarıyla Eklendi.',
        icon: 'success',
      })
      console.log(values)
    }
    return HStack(
      ReactView(
        <div style={{ width: '100%', height: '100%' }}>
          <Navbar pageName={"Müşteri Listesi"} />

          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#F5F5F5',
                display: 'flex',
                width: '800px',
                height: '700px',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ color: '#5C5C5C', fontWeight: '500' }}>
                  Müşteri Tanımlama
                </h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '296px',
                  height: '550px',
                  margin: '0 auto',
                  flexDirection: 'column',
                  marginTop: '20px',
                }}
              >
                {/* select option müşteri */}
                <label
                  style={{
                    fontWeight: '500',
                    fontSize: '13px',
                    color: '#5C5C5C',
                    marginBottom: '8px',
                  }}
                >
                  Müşteri Firma
                </label>
                <select
                  style={{
                    width: '296px',
                    height: '39px',
                    paddingLeft: '5px',
                    marginBottom: '30px',
                    borderRadius: '8px',
                  }}
                  name="Tenant"
                  id="musteri-firma"
                  onChange={onChange}
                  defaultValue={'0'}
                >
                  <option disabled value="0">
                    Tenant Seçiniz
                  </option>
                  <option value="bmw">BMW</option>
                  <option value="audi">AUDI</option>
                  <option value="merso">MERSO</option>
                  <option value="volkswagen">VOLKSWAGEN</option>
                </select>

                {/* ad soyad input */}
                <label
                  style={{
                    fontWeight: '500',
                    fontSize: '13px',
                    color: '#5C5C5C',
                    marginBottom: '8px',
                  }}
                >
                  Müşteri Sorumlusu Ad-Soyad
                </label>
                <input
                  type="text"
                  id="musteri-ad-soyad"
                  name="Customer_Manager_Name"
                  placeholder="Ad Soyad Giriniz..."
                  onChange={onChange}
                  style={{
                    width: '295px',
                    height: '35px',
                    marginBottom: '30px',
                    border: '1px solid  rgb(133, 133, 133)',
                    borderRadius: '8px',
                    paddingLeft: '8px',
                  }}
                />

                {/* email input */}
                <label
                  style={{
                    fontWeight: '500',
                    fontSize: '13px',
                    color: '#5C5C5C',
                    marginBottom: '8px',
                  }}
                >
                  Müşteri Sorumlusu e-mail
                </label>
                <input
                  type="email"
                  placeholder="E-mail giriniz"
                  id="musteri-mail"
                  name="Customer_Manager_eMail"
                  onChange={onChange}
                  style={{
                    width: '295px',
                    height: '35px',
                    border: '1px solid  rgb(133, 133, 133)',
                    borderRadius: '8px',
                    paddingLeft: '8px',
                  }}
                />

                {/* Switch */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '30px',
                    alignItems: 'center',
                  }}
                >
                  <label
                    style={{
                      fontSize: '13px',
                      marginRight: '10px',
                      fontWeight: '500',
                      color: '#5C5C5C',
                    }}
                  >
                    Aktif/Pasif
                  </label>
                  <Switch
                    name="isActive"
                    onChange={handleCheckboxChange}
                    defaultChecked
                  />
                </div>

                {/* Buton */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '30px',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={onClick}
                    type="submit"
                    style={{
                      width: '300px',
                      height: '37px',
                      color: 'white',
                      backgroundColor: '#3C8D40',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '15px',
                      textTransform: 'none',
                    }}
                  >
                    Kaydet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    ).fontFamily('Poppins,sans-serif')
  }
}
