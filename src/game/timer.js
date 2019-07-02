import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const Box = styled.div`
    text-align: center;
    margin: 0 15px;
    width: 200px;
    position: relative;

    span {
        position: absolute;
        left: 0;
        right: 0;

        ${props => props.stopped && css`
            color: green;
            font-size: 1.4em;
            animation: zoom 1s ease forwards;
        `}
    }

    @keyframes zoom {
        0% { transform: scale(1); }
        50% { transform: scale(2); }
        100% { transform: scale(1.3); }
    }
`

const Timer = ({ startTime, stop=false }) => {
    const [diff, setDiff] = useState(0)
    const [intervalId, setIntervalId] = useState(null)
    const [finished, setFinished] = useState(false)
    
    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setDiff(Date.now() - startTime)
        }, 1)
        setIntervalId(intervalId)
        return () => {
            if (intervalId) {
                window.clearInterval(intervalId)
            }
        }
    }, [startTime])

    useEffect(() => {
        if (stop && intervalId) {
            setFinished(true)
            window.clearInterval(intervalId)
        }
    }, [stop])

    return (
        <Box stopped={finished}>
            <span>{diff / 1000}s</span>
        </Box>
    )
}

export default Timer
