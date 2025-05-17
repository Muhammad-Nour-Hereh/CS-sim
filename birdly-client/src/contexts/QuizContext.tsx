import {
  MatchQuestion,
  OrderQuestion,
  Question,
  SelectQuestion,
  WriteQuestion,
} from '@/interfaces/Question'
import { remote } from '@/remotes/remotes'
import { createContext, useContext, useEffect, useState } from 'react'

export type QuizContext = {
  loading: boolean
  curQuestion: Question
  progressPercent: number
  nextQuestion: () => void
  setWriteAnswer: Function
  setSelectAnswer: Function
  setOrderAnswer: Function
  setMatchAnswer: Function
  checkAnswer: Function
}

const quizContext = createContext<QuizContext | undefined>(undefined)

const QuizProvider = ({ children }: any) => {
  // const questions: Question[] = [
  //   // Select Question
  //   {
  //     title: 'Which of the following is a valid Python variable name?',
  //     content: {
  //       answers: ['2myVar', '_myVar', 'my-var', 'class'],
  //       correctAnswer: '_myVar',
  //     },
  //     type: 'select',
  //   },

  //   // Write Question
  //   {
  //     title: 'What Python keyword is used to delete a variable?',
  //     content: {
  //       correctAnswer: 'del',
  //     },
  //     type: 'write',
  //   },

  //   // Order Question
  //   {
  //     title:
  //       'Arrange these steps in the correct order to swap two variables in Python without using a temporary variable.',
  //     content: {
  //       correctOrder: ['x = 10, y = 20', 'x = x + y', 'y = x - y', 'x = x - y'],
  //       pieces: ['y = x - y', 'x = 10, y = 20', 'x = x - y', 'x = x + y'],
  //     },
  //     type: 'order',
  //   },

  //   // Match Question
  //   {
  //     title: 'Match each Python variable type with its corresponding example.',
  //     content: {
  //       pairs: [
  //         { left: 'int', right: '42', selected: false },
  //         { left: 'float', right: '3.14', selected: false },
  //         { left: 'str', right: "'hello'", selected: false },
  //         { left: 'list', right: '[1, 2, 3]', selected: false },
  //         { left: 'dict', right: "{'key': 'value'}", selected: false },
  //       ],
  //     },
  //     type: 'match',
  //   },
  // ]

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  const questionCount = questions.length
  const [index, setIndex] = useState(0)
  const curQuestion = questions[index] || null
  const progressPercent = (index / questionCount) * 100

  const nextQuestion = () => {
    setIndex(() => (index + 1) % questionCount)
  }

  // answers states
  const [writeAnswer, setWriteAnswer] = useState('')
  const [selectAnswer, setSelectAnswer] = useState('')
  const [orderAnswer, setOrderAnswer] = useState<string[]>([])
  const [matchAnswer, setMatchAnswer] = useState({ left: '', right: '' })

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(false)
      const res = await remote.level.getQuestions(1)
      setQuestions(res.data || [])
      console.log(res.data)
      setLoading(true)
    }
    fetchQuestions()
  }, [])

  useEffect(() => {
    console.log(matchAnswer)
    if (matchAnswer.left !== '' && matchAnswer.right !== '')
      console.log(checkAnswer())
  }, [matchAnswer])

  const checkAnswer = () => {
    switch (curQuestion.type) {
      case 'write': {
        const { correctAnswer } = (curQuestion as WriteQuestion).content
        return writeAnswer.trim() === correctAnswer
      }

      case 'select': {
        const { correctAnswer } = (curQuestion as SelectQuestion).content
        return selectAnswer === correctAnswer
      }

      case 'order': {
        const { correctOrder } = (curQuestion as OrderQuestion).content
        return orderAnswer.join('') === correctOrder.join('')
      }

      case 'match': {
        const { pairs } = (curQuestion as MatchQuestion).content

        const matchIndex = pairs.findIndex(
          ({ left, right }) =>
            left === matchAnswer.left && right === matchAnswer.right,
        )

        if (matchIndex !== -1) {
          // Mark as selected
          pairs[matchIndex].selected = true
        }

        const match = matchIndex !== -1
        setMatchAnswer({ left: '', right: '' }) // Reset selection
        return match
      }

      default:
        return false
    }
  }

  return (
    <quizContext.Provider
      value={{
        loading,
        curQuestion,
        progressPercent,
        nextQuestion,
        setWriteAnswer,
        setSelectAnswer,
        setOrderAnswer,
        setMatchAnswer,
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
