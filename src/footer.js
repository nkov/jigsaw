import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
    text-align: center;
    padding-bottom: 10px;
`

const Footer = () => {
    return (
        <Box>
            [<a href="https://github.com" target="_blank">code</a>]
        </Box>
    )
}

export default Footer
