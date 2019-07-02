import React from 'react'
import styled from 'styled-components'
import Button from './button'
import { useLanguage } from '../contexts/language.context'
import Text from '../data/text.json'

const Box = styled.div`
    text-align: center;
    margin: 20px 0;

    > div + div {
        margin-left: 10px;
    }
`

const Buttons = ({ showOriginal, setShowOriginal, onSolve, onShuffle, onReset }) => {
    const [lang] = useLanguage()
    return (
        <Box>
            <Button text={Text.reset[lang]} onClick={onReset} />
            <Button text={Text.shuffle[lang]} onClick={onShuffle} />
            <Button text={Text.solve[lang]} onClick={onSolve} />
            <Button text={`${showOriginal ? Text.hide[lang] : Text.show[lang]} ${Text.original[lang]}`} onClick={() => setShowOriginal(!showOriginal)} />
        </Box>
    )
}

export default Buttons
