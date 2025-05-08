import { createContext, useContext, useEffect, useState } from "react"
import { request } from "../remotes/request"

const authContext = createContext({})

const AuthProvider = ({ children }: any) => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState()

    const checkAuth = async () => {
        setIsLoading(true)

        const token = localStorage.access_token

        if (!token) {
            setIsAuth(false)
            setIsLoading(false)
        } else {
            const response = await request({
                method: "GET",
                route: "/me",
                auth: true,
            })

            setIsLoading(false)
            setIsAuth(!response.error)

            if (!response.error) {
                setType(response.type)
            }
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
                type,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext)

    if (!context) {
        throw Error("IsAuth hook can only be used in an AuthProvider context")
    }

    return context
}

export default AuthProvider