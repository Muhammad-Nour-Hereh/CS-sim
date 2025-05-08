import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = () => {
    const isAutherized = true

    return (
        isAutherized ? <Outlet /> : <Navigate to='/login' />
    )
}

export default UserRoutes