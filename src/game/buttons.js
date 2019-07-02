import React from 'react'
import styled from 'styled-components'
import Button from './button'

const Box = styled.div`
    text-align: center;
    margin: 20px 0;

    > div + div {
        margin-left: 10px;
    }
`

const Buttons = ({ showOriginal, setShowOriginal, onSolve, onShuffle, onReset }) => {
    return (
        <Box>
            <Button text='Reset' onClick={onReset} />
            <Button text='Shuffle' onClick={onShuffle} />
            <Button text='Solve' onClick={onSolve} />
            <Button text={`${showOriginal ? 'Hide' : 'Show'} Original`} onClick={() => setShowOriginal(!showOriginal)} />
        </Box>
    )
}

export default Buttons
