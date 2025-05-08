import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const GuestRoutes = ({ element, ...rest }: any) => {
    const isAuthenticated = !!localStorage.getItem('authToken')

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/login" replace />}
        />
    )
}

export default GuestRoutes