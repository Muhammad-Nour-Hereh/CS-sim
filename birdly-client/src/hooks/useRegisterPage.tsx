import { ROUTES } from '@/objects/routes'
import { validateEmail, validatePassword } from '@/utils/validators'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FieldErrors = Record<string, string>

const useRegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [repassword, setRepassword] = useState('')

  const [errors, setErrors] = useState<FieldErrors>({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: FieldErrors = {}

    newErrors.email = validateEmail(email)
    newErrors.password = validatePassword(password)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // handles
  const RegisterHandle = async () => {
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

  const navigateLoginHandle = () => navigate(ROUTES.LOGIN)

  useEffect(() => {
    console.log('register page is loaded')
  }, [])

  return {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    repassword,
    setRepassword,
    errors,
    RegisterHandle,
    navigateLoginHandle,
  }
}

export default useRegisterPage
