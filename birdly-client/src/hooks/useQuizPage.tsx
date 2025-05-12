import { QuizContext, useQuiz } from '@/contexts/QuizContext'
import { ROUTES } from '@/objects/routes'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

  const { progressPercent, nextQuestion, check }: QuizContext = useQuiz()

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }

  const checkHandle = () => {
    console.log(check())
    nextQuestion()
  }
  return { progressPercent, naivgateHomeHandle, checkHandle }
}

export default useQuizPage
