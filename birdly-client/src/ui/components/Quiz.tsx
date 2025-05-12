import React from 'react'

import MatchQuiz from './quiz-components/MatchQuiz'
import OrderQuiz from './quiz-components/OrderQuiz'
import SelectQuiz from './quiz-components/SelectQuiz'
import WriteQuiz from './quiz-components/WriteQuiz'
import { MatchQuestion, OrderQuestion, Question, SelectQuestion, WriteQuestion } from '@/interfaces/question'

const Quiz: React.FC<Question> = (question: Question) => {
  const { type } = question
  const quizComponents = {
    select: <SelectQuiz question={question as SelectQuestion} />,
    match: <MatchQuiz question={question as MatchQuestion} />,
    order: <OrderQuiz question={question as OrderQuestion} />,
    write: <WriteQuiz question={question as WriteQuestion} />,
  }

  return quizComponents[type] || <p>Invalid quiz type: {type}</p>
}

export default Quiz
