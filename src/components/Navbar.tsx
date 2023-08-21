import { Button } from '@mui/material'
import { useNavigate } from '@tuval/forms'
import React from 'react'
import styled from 'styled-components'

interface IMenuButtonStyle {
  isActive?: boolean
}

function Navbar({ pageName }: { pageName: string }) {
  const navigate = useNavigate()

  const MenuButton = styled.div<IMenuButtonStyle>`
  height: 35px;
  white-space: nowrap;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  background-color: ${(props) => (props.isActive ? 'white' : 'transparent')};
  color: ${(props) => (props.isActive ? 'black' : 'whitesmoke')};
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: white;
    color: black;
  }
`;




  const menuItems = [
    { name: 'Müşteri Yönetimi', path: '/app/com.pedasoft.app.licensemanager/customers/list' },
    { name: 'Lisans Yönetimi', path: '/app/com.pedasoft.app.licensemanager/licenses/list' },
    { name: 'Müşteri-Lisans İşlemleri', path: '/app/com.pedasoft.app.licensemanager/customers/license' },
  ]

  return (
    <div style={{ display: "flex", width: "100%", height: "60px", backgroundColor: "#738694", alignItems: "center" }}>
      <div style={{ display: "flex", width: "95%", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ position: "relative", left: "30px", color: "whitesmoke", fontWeight: "500", fontSize: "20px" }}>License Manager</h2>
        <ul style={{ display: "flex", listStyle: "none", color: "whitesmoke" }}>
          {menuItems.map(item => (
            <li style={{ marginLeft: "7px", marginRight: "7px" }}>
              <MenuButton onClick={() => { navigate(item.path) }} isActive={item.name === pageName}>{item.name}</MenuButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Navbar