import React from 'react'
import styled from 'styled-components'
import { useLanguage } from './contexts/language.context'
import Text from './data/text.json'

const Box = styled.div`
    text-align: center;
    padding-bottom: 10px;
`

const Footer = () => {
    const [lang] = useLanguage()
    return (
        <Box>
            [<a href="https://github.com/nkov/jigsaw" target="_blank">{Text.code[lang]}</a>]
        </Box>
    )
}

export default Footer
