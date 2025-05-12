import { useQuiz } from '@/contexts/QuizContext'
import { ROUTES } from '@/objects/routes'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

  const { curQuestion, progressPercent, nextQuestion }: any = useQuiz()

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }
  return { curQuestion, progressPercent, nextQuestion, naivgateHomeHandle }
}

export default useQuizPage
