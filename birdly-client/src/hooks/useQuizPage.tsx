import { QuizContext, useQuiz } from '@/contexts/QuizContext'
import { ROUTES } from '@/objects/routes'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

  const { progressPercent, nextQuestion }: QuizContext = useQuiz()

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }
  return { progressPercent, nextQuestion, naivgateHomeHandle }
}

export default useQuizPage
