import { SelectQuestion } from '@/interfaces/question'
import AnswerList from '../AnswerList'

const SelectQuiz = ({ question }: { question: SelectQuestion }) => {
  const { title, content: { answers, correctAnswer } } = question
  console.log(correctAnswer)
  
  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <AnswerList items={answers} />
    </>
  )
}

export default SelectQuiz
