import React from 'react'
import styled from 'styled-components'

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
    transition: all 0.25s ease-in-out;
    &:hover {
        background-color: rgb(255 255 255 / 57%);
    }
    `;


const PageContent = ({ path, title, content }: { path: string, title: string, content: JSX.Element }) => {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: "35px", color: "darkslategrey", backgroundColor: "rgb(115 134 148 / 45%)", display: "flex", justifyContent: "space-between", padding: "0 40px", alignItems: "center", width: "100%" }}>
                <div><span style={{ fontSize: "14px" }}>{path}</span></div>
                <div><AddNewButton>Yeni Müşteri Ekle</AddNewButton></div>
            </div>
            {/* PAGE CENTER TITLE */}
            <div style={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <span style={{ fontSize: "20px", fontWeight: "500" }}>{title}</span>
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