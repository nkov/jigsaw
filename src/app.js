import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Footer from './footer'
import Game from './game/game'

const Box = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const App = () => {
    return (
        <Box>
            <Header />
            <Game />
            <Footer />
        </Box>
    )
}

export default App
