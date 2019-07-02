import React from 'react'
import styled from 'styled-components'
import LanguageSelector from './language-selector'

const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const Header = () => {
    return (
        <Box>
            <LanguageSelector />
        </Box>
    )
}

export default Header
