import AnswerList from '../AnswerList'
import { Input } from '../Input'

interface SelectQuizProps {
  title: string
  content: any
}

const SelectQuiz = ({ title, content }: SelectQuizProps) => {
  const { answers } = content

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <AnswerList items={answers} />
    </>
  )
}

export default SelectQuiz
