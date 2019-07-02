import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const shuffle = (array) => {
    let j, x, i
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = array[i]
        array[i] = array[j]
        array[j] = x
    }
    return array
}

const Board = styled.div`
    max-width: ${props => props.maxWidth+15 || '600'}px;
    max-height: ${props => props.maxHeight+15 || '600'}px;

    .row {
        display: flex;
        justify-content: center;
    }

    img {
        margin-right: 5px;
        margin: 0;
        padding: 0;
        margin-bottom: -5px;

        &.original {
            visibility: hidden;
            position: absolute;
            // max-width: 600px;
            // max-height: 600px;
        }
    }
`

const ImageBoard = ({ image, rows, cols }) => {
    const imgRef = useRef(null)
    const [chops, setChops] = useState([])
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)

    const chopImage = () => {
        if (!image || !imgRef.current) {
            return
        }

        setChops([])

        const img = new Image()
        img.src = image.preview

        const { width, height } = img
    
        const unitWidth = Math.floor(width / cols)
        const unitHeight = Math.floor(height / rows)

        setWidth(width)
        setHeight(height)

        const chops = []
        
        for (let x=0; x<rows; ++x) {
            for (let y=0; y<cols; ++y) {
                const canvas = document.createElement('canvas')
                canvas.width = unitWidth
                canvas.height = unitHeight
                const context = canvas.getContext('2d')
                context.drawImage(img, y * unitWidth, x * unitHeight, unitWidth, unitHeight, 0, 0, unitWidth, unitHeight)
                const url = canvas.toDataURL()
                chops.push(url)
            }
        }
        setChops(shuffle(chops))
        // setChops(chops)
    }

    useEffect(chopImage, [image])

    let maxWidth = width
    let maxHeight = height
    if (maxWidth > 600) {
        const ratio = maxWidth / 600
        maxWidth = 600
        maxHeight = Math.ceil(maxHeight / ratio)
    }
    if (maxHeight > 600) {
        const ratio = maxHeight / 600
        maxHeight = 600
        maxWidth = Math.ceil(maxWidth / ratio)
    }

    return (
        <Board maxWidth={maxWidth} maxHeight={maxHeight}>
            <img ref={imgRef} src={image.preview} className='original' width={width} height={height} />
            <>
                {chops.map((chop, idx) => (
                    maxWidth > maxHeight
                        ? <img key={`chop-${idx}`} src={chop} width={Math.floor(maxWidth / cols)} />
                        : <img key={`chop-${idx}`} src={chop} height={Math.floor(maxHeight / rows)} />
                    ))}
            </>
        </Board>
    )
}

export default ImageBoard