import React from 'react'
import styled, { css } from 'styled-components'

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;

    ${props => {
        switch(props.type) {
            case 'primary':
                return css`
                    background-color: blue;
                    color: white;
                `
            case 'secondary':
                return css`
                    background-color: red;
                    color: black;
                `
            default:
                return css`
                    border: 1px solid #000;
                    background-color: #fff;
                    color: #000;
                `
        }
    }}
`

const Button = ({ text, onClick, disabled, className, type }) => (
    <Box onClick={onClick} disabled={disabled} className={className} type={type}>
        {text}
    </Box>
)

export default Button
