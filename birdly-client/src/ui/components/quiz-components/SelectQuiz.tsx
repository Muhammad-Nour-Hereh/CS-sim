import AnswerList from '../AnswerList'

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
