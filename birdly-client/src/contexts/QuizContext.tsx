import {
  MatchQuestion,
  OrderQuestion,
  Question,
  SelectQuestion,
  WriteQuestion,
} from '@/interfaces/question'
import { createContext, useContext, useState } from 'react'

export type QuizContext = {
  curQuestion: Question
  progressPercent: number
  nextQuestion: () => void
  setWriteAnswer: Function
  setSelectAnswer: Function
  setOrderAnswer: Function
  setUserPairs: Function
  checkAnswer: Function
}

const quizContext = createContext<QuizContext | undefined>(undefined)

const QuizProvider = ({ children }: any) => {
  const questions: Question[] = [
    // Select Question
    {
      title: 'Which of the following is a valid Python variable name?',
      content: {
        answers: ['2myVar', '_myVar', 'my-var', 'class'],
        correctAnswer: '_myVar',
      },
      type: 'select',
    },

    // Write Question
    {
      title: 'What Python keyword is used to delete a variable?',
      content: {
        correctAnswer: 'del',
      },
      type: 'write',
    },

    // Order Question
    {
      title:
        'Arrange these steps in the correct order to swap two variables in Python without using a temporary variable.',
      content: {
        correctOrder: ['x = 10, y = 20', 'x = x + y', 'y = x - y', 'x = x - y'],
        pieces: ['y = x - y', 'x = 10, y = 20', 'x = x - y', 'x = x + y'],
      },
      type: 'order',
    },

    // Match Question
    {
      title: 'Match each Python variable type with its corresponding example.',
      content: {
        pairs: [
          ['int', '42'],
          ['float', '3.14'],
          ['str', "'hello'"],
          ['list', '[1, 2, 3]'],
          ['dict', "{'key': 'value'}"],
        ],
      },
      type: 'match',
    },
  ]

  const questionCount = questions.length
  const [index, setIndex] = useState(0)
  const curQuestion = questions[index]
  const progressPercent = (index / questionCount) * 100

  const nextQuestion = () => {
    setIndex(() => (index + 1) % questionCount)
  }

  // answers states
  const [writeAnswer, setWriteAnswer] = useState('')
  const [selectedAnswer, setSelectAnswer] = useState('')
  const [selectedOrder, setOrderAnswer] = useState<string[]>([])
  const [userPairs, setUserPairs] = useState<[string, string][]>([])

  const checkAnswer = () => {
    switch (curQuestion.type) {
      case 'write': {
        const { correctAnswer } = (curQuestion as WriteQuestion).content
        return writeAnswer.trim() === correctAnswer
      }

      case 'select': {
        const { correctAnswer } = (curQuestion as SelectQuestion).content
        return selectedAnswer === correctAnswer
      }

      case 'order': {
        const { correctOrder } = (curQuestion as OrderQuestion).content
        return selectedOrder.join('') === correctOrder.join('')
      }

      case 'match': {
        const { pairs } = (curQuestion as MatchQuestion).content
        return JSON.stringify(userPairs) === JSON.stringify(pairs)
      }

      default:
        return false
    }
  }

  return (
    <quizContext.Provider
      value={{
        curQuestion,
        progressPercent,
        nextQuestion,
        setWriteAnswer,
        setSelectAnswer,
        setOrderAnswer,
        setUserPairs,
        checkAnswer,
      }}>
      {children}
    </quizContext.Provider>
  )
}

export const useQuiz = (): QuizContext => {
  const context = useContext(quizContext)

  if (!context) {
    throw Error('useQuiz hook can only be used in an QuizProvider context')
  }

  return context
}

export default QuizProvider
