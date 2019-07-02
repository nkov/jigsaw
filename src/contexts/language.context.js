import React, { useState, useContext } from 'react'

const LanguageContext = React.createContext(null)

const useLanguage = () => {
    return useContext(LanguageContext)
}

const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(window.localStorage && window.localStorage.getItem('lang') || 'en')

    const setLanguage = (lang) => {
        setLang(lang)
        if (window.localStorage) {
            window.localStorage.setItem('lang', lang)
        }
    }

    return (
        <LanguageContext.Provider value={[lang, setLanguage]}>
            {children}
        </LanguageContext.Provider>
    )
}

export { LanguageProvider, useLanguage }
