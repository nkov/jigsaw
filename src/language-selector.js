import React from 'react'
import styled from 'styled-components'

const Box = styled.div``

const LanguageSelector = () => {
    return (
        <Box>
            <span onClick={() => setLang('en')}>en</span>&nbsp;|&nbsp;
            <span onClick={() => setLang('ru')}>ru</span>
        </Box>
    )
}

export default LanguageSelector
