import MatchQuiz from './quiz-components/MatchQuiz'
import OrderQuiz from './quiz-components/OrderQuiz'
import SelectQuiz from './quiz-components/SelectQuiz'
import WriteQuiz from './quiz-components/WriteQuiz'
import { QuizContext, useQuiz } from '@/contexts/QuizContext'

const Quiz = () => {
  const {
    curQuestion: { type },
  }: QuizContext = useQuiz()
  
  const quizComponents = {
    select: <SelectQuiz />,
    match: <MatchQuiz />,
    order: <OrderQuiz />,
    write: <WriteQuiz />,
  }

  return quizComponents[type] || <p>Invalid quiz type: {type}</p>
}

export default Quiz
