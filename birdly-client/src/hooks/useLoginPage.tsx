import { ROUTES } from '@/objects/routes'
import { remote } from '@/remotes/remotes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    // if (!email) newErrors.email = 'Email is required'
    // if (!password) newErrors.password = 'Password is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // handles
  const LoginHandle = async () => {
    if (!validateForm()) return

    // try {
    //   const res = await remote.login(email, password)
    //   if (!res.success) {
    //     setErrors({ general: res.message || 'Invalid login credentials' })
    //     return
    //   }

    //   if (!res.payload.access_token) return

    //   localStorage.setItem('access_token', res.payload.access_token)

    //   navigate('/home')
    // } catch (error) {
    //   setErrors({ general: 'Login failed. Please try again.' })
    // }

    navigate(ROUTES.HOME)
  }

  const navigateRegisterHandle = () => navigate(ROUTES.REGISTER)
  const navigateForgetPasswordHandle = () => navigate(ROUTES.FORGETPASSWORD)

  useEffect(() => {
    console.log('login page is loaded')
  }, [])

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    LoginHandle,
    navigateRegisterHandle,
    navigateForgetPasswordHandle,
  }
}

export default useLoginPage
