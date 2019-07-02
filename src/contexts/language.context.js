import React, { useState, useContext } from 'react'

const LanguageContext = React.createContext(null)

const useLanguage = () => {
    return useContext(LanguageContext)
}

const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en')

    return (
        <LanguageContext.Provider value={[lang, setLang]}>
            {children}
        </LanguageContext.Provider>
    )
}

export { LanguageProvider, useLanguage }
