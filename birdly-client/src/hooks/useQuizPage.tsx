import { Question } from '@/interfaces/question'
import { ROUTES } from '@/objects/routes'
import { useNavigate } from 'react-router-dom'

const useQuizPage = () => {
  const navigate = useNavigate()

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

  const naivgateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }
  return { questions, naivgateHomeHandle }
}

export default useQuizPage
