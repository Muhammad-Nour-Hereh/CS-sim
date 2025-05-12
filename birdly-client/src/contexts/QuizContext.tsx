import { Question } from '@/interfaces/question'
import { createContext, useContext, useState } from 'react'

const quizContext = createContext({})

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
  const [curQuestion, setCurQuestion] = useState(0)

  const progressPercent = curQuestion / questionCount

  const nextQuestion = () => {
    setCurQuestion(() => (curQuestion + 1) % questionCount)
  }

  return (
    <quizContext.Provider value={{ questions, progressPercent, nextQuestion }}>
      {children}
    </quizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(quizContext)

  if (!context) {
    throw Error('IsQuiz hook can only be used in an QuizProvider context')
  }

  return context
}

export default QuizProvider
