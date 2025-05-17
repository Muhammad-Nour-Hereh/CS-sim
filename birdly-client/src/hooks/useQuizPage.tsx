import { QuizContext, useQuiz } from '@/contexts/QuizContext'
import { ROUTES } from '@/objects/routes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

  const { progressPercent, nextQuestion, checkAnswer, loading }: QuizContext =
    useQuiz()
  const [showFeedback, setShowFeedback] = useState(false)
  const [result, setResult] = useState<'correct' | 'wrong'>('correct')

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }

  const checkHandle = () => {
    const isCorrect = checkAnswer()
    setResult(isCorrect ? 'correct' : 'wrong')
    setShowFeedback(true)
  }

  const FeedbackHandle = () => {
    nextQuestion()
    setShowFeedback(false)
  }

  const skipAnswer = () => {
    setResult('wrong')
    setShowFeedback(true)
  }

  return {
    loading,
    progressPercent,
    showFeedback,
    result,
    skipAnswer,
    naivgateHomeHandle,
    checkHandle,
    FeedbackHandle,
  }
}

export default useQuizPage
