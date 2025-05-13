import { createContext, useContext, useEffect, useState } from "react"


const snippetContext = createContext({})

const SnippetProvider = ({ children }: any) => {
    
    return (
        <snippetContext.Provider
            value={{

            }}
        >
            {children}
        </snippetContext.Provider>
    )
}

export const useSnippet = () => {
    const context = useContext(snippetContext)

    if (!context) {
        throw Error("useSnippet hook can only be used in an SnippetProvider context")
    }

    return context
}

export default SnippetProvider