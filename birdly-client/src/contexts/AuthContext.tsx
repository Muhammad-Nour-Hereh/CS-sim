import { createContext, useContext, useEffect, useState } from "react"
import { remote } from "@/remotes/remotes"

const authContext = createContext({})

const AuthProvider = ({ children }: any) => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const checkAuth = async () => {
        setIsLoading(true)

        const token = localStorage.access_token

        if (!token) {
            setIsAuth(false)
            setIsLoading(false)
        } else {
            const response = await remote.auth.me()

            setIsLoading(false)
            setIsAuth(!response.error)

        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <authContext.Provider
            value={{
                checkAuth,
                isLoading,
                isAuth,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext)

    if (!context) {
        throw Error("useAuth hook can only be used in an AuthProvider context")
    }

    return context
}

export default AuthProvider