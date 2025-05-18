import { QuizContext, useQuiz } from '@/contexts/QuizContext'
import { ROUTES } from '@/routes/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

  const {
    progressPercent,
    nextQuestion,
    checkAnswer,
    loading,
    correctAnswer,
    checkable,
  }: QuizContext = useQuiz()

  const [subtitle, setSubtitle] = useState('subtitle')
  const [showFeedback, setShowFeedback] = useState(false)
  const [result, setResult] = useState<'correct' | 'wrong' | 'almost'>(
    'correct',
  )

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }

  const checkHandle = async () => {
    const isCorrect = await checkAnswer()
    if (isCorrect === 'correct' || isCorrect === 'almost') {
      setResult(isCorrect)
    } else {
      setResult('wrong')
    }
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

  useEffect(() => {
    result === 'correct' ? setSubtitle('') : setSubtitle(correctAnswer)
    console.log(result)
  }, [correctAnswer, result])

  return {
    loading,
    progressPercent,
    showFeedback,
    subtitle,
    setSubtitle,
    checkable,
    result,
    skipAnswer,
    naivgateHomeHandle,
    checkHandle,
    FeedbackHandle,
  }
}

export default useQuizPage
