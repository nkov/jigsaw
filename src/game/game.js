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
    // width: 600px;
    max-width: 50%;
    text-align: center;
`

const Game = () => {
    const [started, setStarted] = useState(false)
    const [rows, setRows] = useState(3)
    const [cols, setCols] = useState(3)
    const [image, setImage] = useState(null)
    const [showOriginal, setShowOriginal] = useState(false)
    const [shuffleKey, setShuffleKey] = useState(0)
    const [startTime, setStartTime] = useState(null)
    const [done, setDone] = useState(false)

    const onStart = () => {
        setStarted(true)
        setShowOriginal(false)
        setStartTime(new Date())
    }
    const onSolve = () => {

    }

    const onDone = () => {
        setDone(true)
        setShowOriginal(true)
    }

    const onShuffle = () => {
        setShuffleKey(Math.floor(Math.random() * 50) + 1)
    }

    const onReset = () => {
        setDone(false)
        setStartTime(null)
        setStarted(false)
    }

    return (
        <Box>
            <GameBox>
                <ImageBox>
                    {!started && <ImageUpload image={image} setImage={setImage} />}
                    {started && <ImageBoard shuffleKey={shuffleKey} image={image} rows={rows} cols={cols} onDone={onDone} />}
                </ImageBox>
                {started && <Timer startTime={startTime} stop={done} />}
                {!started && image && (
                    <ImageControls
                        rows={rows}
                        cols={cols}
                        setRows={setRows}
                        setCols={setCols}
                        onStart={onStart} />
                )}
                {started && image && <OriginalImage blurred={!showOriginal} src={image.preview} />}
            </GameBox>
            {started && (
                <Buttons
                    showOriginal={showOriginal}
                    setShowOriginal={setShowOriginal}
                    onShuffle={onShuffle}
                    onReset={onReset}
                    onSolve={onSolve} />
            )}
        </Box>
    )
}

export default Game
