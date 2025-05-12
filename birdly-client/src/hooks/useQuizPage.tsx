import { useQuiz } from '@/contexts/QuizContext'
import { ROUTES } from '@/objects/routes'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

  const { questions, progressPercent, nextQuestion }: any = useQuiz()

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }
  return { questions, progressPercent, nextQuestion, naivgateHomeHandle }
}

export default useQuizPage
