import { Button } from '../components/Button'
import { Input } from '../components/Input'
import useRegisterPage from '@/hooks/useRegisterPage'

const RegisterPage = () => {
  const {
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
  } = useRegisterPage()

  return (
    <div className="pg-background flex h-screen w-screen items-center justify-center">
      <div className="bg-border flex w-150 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-white p-9">
        <h1 className="self-start text-3xl font-bold mb-4">Register</h1>
        <Input
          value={name}
          setter={setName}
          errorMsg={errors.name}
          placeholder="name"
          className="h-13 border-2 text-2xl font-bold"
        />
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
        <Input
          value={repassword}
          setter={setRepassword}
          errorMsg={errors.repassword}
          placeholder="confirm the password"
          variant="password"
          className="h-13 border-2 text-2xl font-bold"
        />
        <Button
          onClick={RegisterHandle}
          className="w-full my-4 text-xl font-bold text-white"
          variant="borderless">
          Register
        </Button>
        <span className="self-start text-lg font-semibold">
          already have an account!
          <span
            className="text-primary cursor-pointer font-semibold"
            onClick={navigateLoginHandle}>
            {' '}
            Login
          </span>
        </span>
      </div>
    </div>
  )
}

export default RegisterPage
