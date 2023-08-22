import React from 'react'
import styled from 'styled-components'

const CustomSelect = styled.select`
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
const CustomSelectLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    `;
const CustomSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
    `;

const SelectInput = ({ label, name, value, options, onChange, }: { label: string, name: string, value: string, options: { value: string, text: string }[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    return (
        <CustomSelectContainer>
            <CustomSelectLabel>{label}</CustomSelectLabel>
            <CustomSelect value={value} name={name} onChange={onChange}>
                <option value="" disabled selected hidden>Seçiniz</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </CustomSelect>
        </CustomSelectContainer>
    )
}

export default SelectInput