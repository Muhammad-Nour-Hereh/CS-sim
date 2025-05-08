import { Navigate, Outlet } from 'react-router-dom'

const GuestRoutes = () => {
    const isAutherized = true

    return (
        isAutherized ? <Outlet /> : <Navigate to='/home' />
    )
}

export default GuestRoutes