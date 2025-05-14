import { ReactNode } from 'react'
import AuthProvider from './AuthContext'
import QuizProvider from './QuizContext'
import SnippetProvider from './SnippetContext'

type Props = {
  children: ReactNode
}

const Contexts = ({ children }: Props) => {
  return (
    <AuthProvider>
      <QuizProvider>
        <SnippetProvider>
          {children}
        </SnippetProvider>
      </QuizProvider>
    </AuthProvider>
  )
}

export default Contexts
