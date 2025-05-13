import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { remote } from '@/remotes/remotes'

const UserRoutes = () => {
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await remote.me()

      // Convert "success" to actual boolean
      const success = res.success === 'true'

      if (!success) {
        localStorage.removeItem('access_token') // force logout on failure
      }

      setIsAuthorized(success)
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />
}

export default UserRoutes