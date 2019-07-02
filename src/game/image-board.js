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
        }
    }
`

const ImageBoard = ({ image, rows, cols, onDone, shuffleKey=0 }) => {
    const imgRef = useRef(null)
    const [chops, setChops] = useState([])
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)
    const [dragItem, setDragItem] = useState(null)

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

        let chops = []
        
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
        chops = chops.map((chop, idx) => ({ url: chop, idx }))
        setChops(shuffle(chops))
    }

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

    const onDragStart = (e, chop, idx) => {
        setDragItem({ chop, idx })
    }

    const onDragOver = e => e.preventDefault()

    const onDrop = (e, idx) => {
        swapDrag(idx)
    }

    const swapDrag = (toIdx) => {
        if (!dragItem) {
            return
        }
        setChops(chops => {
            const newChops = [...chops]
            const temp = newChops[toIdx]
            newChops[toIdx] = dragItem.chop
            newChops[dragItem.idx] = temp
            return newChops
        })
        setDragItem(null)
    }

    const checkDone = () => {
        if (!chops.length) {
            return
        }
        const indices = chops.map(c => c.idx)
        const sorted = [...indices].sort()
        const done = JSON.stringify(sorted) === JSON.stringify(indices)
        if (done) {
            onDone()
        }
    }
    
    useEffect(chopImage, [image])
    useEffect(checkDone, [chops])
    useEffect(() => {
        if (shuffleKey && chops.length) {
            setChops(chops => shuffle([...chops]))
        }
    }, [shuffleKey])

    return (
        <Board maxWidth={maxWidth} maxHeight={maxHeight}>
            <img ref={imgRef} src={image.preview} className='original' width={width} height={height} />
            <>
                {chops.map((chop, idx) => {
                    const imgProps = {}
                    if (maxWidth > maxHeight) {
                        imgProps.width = Math.floor(maxWidth / cols)
                    } else {
                        imgProps.height = Math.floor(maxHeight / rows)
                    }
                    return (
                        <img
                            src={chop.url}
                            draggable
                            onDragStart={e => onDragStart(e, chop, idx)}
                            onDragOver={onDragOver}
                            onDrop={e => onDrop(e, idx)}
                            key={`chop-${idx}`}
                            {...imgProps} />
                    )
                })}
            </>
        </Board>
    )
}

export default ImageBoard