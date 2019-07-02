import React from 'react'
import styled, { css } from 'styled-components'
import { useLanguage } from './contexts/language.context'

const Box = styled.div``

const StyledSpan = styled.span`
    cursor: pointer;

    ${props => props.active && css`
        font-weight: bold;
    `}
`

const LanguageSelector = () => {
    const [lang, setLang] = useLanguage()
    return (
        <Box>
            <StyledSpan active={lang === 'en'} onClick={() => setLang('en')}>en</StyledSpan>&nbsp;|&nbsp;
            <StyledSpan active={lang === 'ru'} onClick={() => setLang('ru')}>ru</StyledSpan>
        </Box>
    )
}

export default LanguageSelector
