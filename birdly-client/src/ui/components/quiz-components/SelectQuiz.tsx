import AnswerList from '../AnswerList'
import { useQuiz } from '@/contexts/QuizContext'

const SelectQuiz = () => {
  const {
    curQuestion: {
      title,
      content: { answers, correctAnswer },
    },
  }: any = useQuiz()
  
  console.log(correctAnswer)

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <AnswerList items={answers} />
    </>
  )
}

export default SelectQuiz
