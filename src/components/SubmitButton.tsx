import React from 'react'
import styled from 'styled-components'

const SubmitButton = styled.button`
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    width: 100%;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        outline: none;
        border: 1px solid gray;
    }
    &:focus {
        outline: none;
        border: 1px solid lightblue;
        color: lightblue;
    }
    `;

export default SubmitButton;