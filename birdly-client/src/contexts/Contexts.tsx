import { ReactNode } from 'react'
import AuthProvider from './AuthContext'
import QuizProvider from './QuizContext'

type Props = {
  children: ReactNode
}

const Contexts = ({ children }: Props) => {
  return (
    <AuthProvider>
      <QuizProvider>
        {children}
      </QuizProvider>
    </AuthProvider>
  )
}

export default Contexts
