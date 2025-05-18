import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const isAutherized = true

    return (
        isAutherized ? <Outlet /> : <Navigate to='/login' />
    )
}

export default AdminRoutes