import useLoginPage from '@/hooks/useLoginPage'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Separator } from '../components/Separator'

const LoginPage = () => {
  const { email, setEmail, password, setPassword, errors, handleLogin } =
    useLoginPage()

  return (
    <div className="pg-background flex h-screen w-screen items-center justify-center">
      <div className="bg-border flex w-150 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-white p-9">
        <h1 className="self-start text-3xl font-bold">Login</h1>
        <Input
          value={email}
          // onChange={setEmail}
          placeholder="name"
          errorMsg="invalid"
          className="h-13 border-2 text-2xl font-bold"
        />
        <Input
          placeholder="password"
          variant="password"
          className="h-13 border-2 text-2xl font-bold"
        />

        <span className="self-start text-lg font-semibold">
          forget password?
        </span>
        <Button
          className="w-full text-xl font-bold text-white"
          variant="borderless">
          Login
        </Button>
        <Separator className="bg-white" />
        <span className="self-start text-lg font-semibold">
          Don't have an accound yet!
          <span className="text-primary cursor-pointer font-semibold">
            {' '}
            Register
          </span>
        </span>
      </div>
    </div>
  )
}

export default LoginPage
