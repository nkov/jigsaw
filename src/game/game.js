import React, { useState } from 'react'
import styled from 'styled-components'
import ImageUpload from './image-upload'
import ImageBoard from './image-board'
import ImageControls from './image-controls'
import OriginalImage from './original-image'
import Buttons from './buttons'
import Timer from './timer'

const Box = styled.div`
    flex: 1;
`
const GameBox = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const ImageBox = styled.div`
    width: 600px;
    max-width: 50%;
`

const Game = () => {
    const [started, setStarted] = useState(false)
    const [rows, setRows] = useState(3)
    const [cols, setCols] = useState(3)
    const [image, setImage] = useState(null)
    const [showOriginal, setShowOriginal] = useState(false)
    const onSolve = () => {

    }

    return (
        <Box>
            <GameBox>
                <ImageBox>
                    {!started && <ImageUpload setImage={setImage} />}
                    {started && <ImageBoard image={image} rows={rows} cols={cols} />}
                </ImageBox>
                <Timer />
                {!started && image && (
                    <ImageControls
                        rows={rows}
                        cols={cols}
                        setRows={setRows}
                        setCols={setCols}
                        onStart={() => setStarted(true)} />
                )}
                {started && image && <OriginalImage blurred={!showOriginal} src={image.preview} />}
            </GameBox>
            {started && <Buttons setShowOriginal={setShowOriginal} onSolve={onSolve} />}
        </Box>
    )
}

export default Game
