export const validateName = (name: string) => {
  if (!name.trim()) return 'This field is required'
  if (name.length < 2) return 'Must be at least 2 characters'
  return ''
}

export const validateEmail = (email: string) => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'Please enter a valid email'
  return ''
}

export const validatePassword = (password: string) => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Must be at least 6 characters'
  return ''
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return 'Passwords do not match'
  return ''
}
