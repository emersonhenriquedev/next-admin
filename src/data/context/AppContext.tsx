import { createContext, useEffect, useState } from "react";

// type Tema = 'dark' | ''

interface AppContextProps {
    tema?: string
    alternarTema: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {
    const [tema, setTema] = useState('dark')

    function alternarTema() {
        setTema(tema === '' ? 'dark' : '')
        localStorage.getItem('tema',tema === '' ? 'dark' : '')
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo)
    },[])

    return (
        <AppContext.Provider value={{ tema, alternarTema }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext
export const AppConsumer = AppContext.Consumer
