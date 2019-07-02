import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Footer from './footer'
import Game from './game/game'
import { LanguageProvider } from './contexts/language.context'

const Box = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const App = () => {
    return (
        <LanguageProvider>
            <Box>
                <Header />
                <Game />
                <Footer />
            </Box>
        </LanguageProvider>
    )
}

export default App
