import React from 'react'
import styled from 'styled-components'

const CustomInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 100%;
  transition: all 0.25s ease-in-out;
  &:hover {
    outline: none;
    border: 1px solid gray;
  }
  &:focus {
    outline: none;
    border: 1px solid gray;
  }
`;

const CustomInputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
`;

const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const TextInput = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <CustomInputContainer>
      <CustomInputLabel>{label}</CustomInputLabel>
      <CustomInput type="text" value={value} name={name} onChange={onChange} />
    </CustomInputContainer>
  )
}

export default TextInput