import React from 'react'
import styled from 'styled-components'
import { ICustomer, ILicense } from '../types/Interfaces';

const AddNewButton = styled.div`
    white-space: nowrap;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    padding: 3px 10px;
    background-color: white;
    color: black;
    margin-right: 5px;
    transition: all 0.25s ease-in-out;
    &:hover {
        background-color: rgb(255 255 255 / 57%);
    }
    `;
const SearchInput = styled.input`
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-right: 10px;
    &:focus {
        outline: none;
    }
    `;


const PageContent = ({ path, title, content, searchValue, searchFunc,searchArea, addNewButtonText, addNewButtonOnClick }: {


    path: string, title: string, content: JSX.Element, searchValue?: string,
    searchFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void, searchArea?:(ICustomer[]|ILicense[]) , addNewButtonText?: string, addNewButtonOnClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {

  
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: "40px", color: "darkslategrey", backgroundColor: "rgb(115 134 148 / 45%)", display: "flex", justifyContent: "space-between", padding: "0 40px", alignItems: "center", width: "100%" }}>
                <div>
                    <span style={{ fontSize: "14px",fontWeight:"500" }}>{path}</span>
                    </div>
                <div style={{ display: "flex" }}>
                    {searchValue != null && <SearchInput type="text" value={searchValue} onChange={searchFunc} placeholder="Ara" />}
                    {addNewButtonText && <AddNewButton onClick={addNewButtonOnClick}>{addNewButtonText}</AddNewButton>}
                </div>
            </div>

            {/* PAGE CENTER TITLE */}
            <div style={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2 style={{ fontSize: "23px", fontWeight: "500" }}>{title}</h2>
            </div>
            <div style={{
                width: "100%",
                height: "calc(100% - 100px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                padding: "0 40px"
            }}>
                {/* PAGE CONTENT */}
                {content}
            </div>

        </div>
    )
}

export default PageContent