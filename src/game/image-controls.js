import React from 'react'
import styled from 'styled-components'
import Button from './button'
import { useLanguage } from '../contexts/language.context'
import Text from '../data/text.json'

const Box = styled.div`
    text-align: center;
    width: 600px;
    max-width: 50%;
    margin-left: 50px;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 15px;
    input {
        margin: 0 10px;
    }
`

const ImageControls = ({ rows, cols, setRows, setCols, canStart, onStart }) => {
    const [lang] = useLanguage()
    return (
        <Box>
            <Row>
                <label htmlFor='rows'>{Text.rows[lang]}</label>
                <input type='range' name='rows' onChange={e => setRows(e.target.value)} value={rows} min={1} max={20} step={1} />
                <span>{rows}</span>
            </Row>
            <Row>
                <label htmlFor='cols'>{Text.cols[lang]}</label>
                <input type='range' name='cols' onChange={e => setCols(e.target.value)} value={cols} min={1} max={20} step={1} />
                <span>{cols}</span>
            </Row>
            <Button text={Text.start[lang]} disabled={!canStart} onClick={onStart} />
        </Box>
    )
}

export default ImageControls
