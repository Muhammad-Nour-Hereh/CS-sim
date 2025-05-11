import useLoginPage from '@/hooks/useLoginPage'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    LoginHandle,
    navigateRegisterHandle,
    navigateForgetPasswordHandle,
  } = useLoginPage()

  return (
    <div className="pg-background flex h-screen w-screen items-center justify-center">
      <div className="bg-border flex w-150 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-white p-9">
        <h1 className="mb-4 self-start text-3xl font-bold">Login</h1>
        <Input
          value={email}
          setter={setEmail}
          errorMsg={errors.email}
          placeholder="email"
          className="h-13 border-2 text-2xl font-bold"
        />
        <Input
          value={password}
          setter={setPassword}
          errorMsg={errors.password}
          placeholder="password"
          variant="password"
          className="h-13 border-2 text-2xl font-bold"
        />
        <span
          className="cursor-pointer self-start text-lg font-semibold"
          onClick={navigateForgetPasswordHandle}>
          forget password?
        </span>
        <Button
          onClick={LoginHandle}
          className="w-full text-xl font-bold text-white"
          variant="borderless">
          Login
        </Button>
        <span className="self-start text-lg font-semibold">
          Don't have an accound yet!
          <span
            className="text-primary cursor-pointer font-semibold"
            onClick={navigateRegisterHandle}>
            {' '}
            Register
          </span>
        </span>
      </div>
    </div>
  )
}

export default LoginPage
