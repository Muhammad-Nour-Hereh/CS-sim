import { Outlet } from 'react-router-dom'

const DevRoutes = () => {
    const isAuthorized = true

    return isAuthorized ? <Outlet /> : null
}

export default DevRoutes