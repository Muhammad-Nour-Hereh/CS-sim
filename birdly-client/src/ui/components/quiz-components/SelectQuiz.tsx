import { SelectQuestion } from '@/interfaces/question'
import AnswerList from '../AnswerList'
import { QuizContext, useQuiz } from '@/contexts/QuizContext'

const SelectQuiz = () => {
  const { curQuestion, setSelectAnswer }: QuizContext = useQuiz()

  const {
    title,
    content: { answers },
  } = curQuestion as SelectQuestion

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <AnswerList
        items={answers}
        onItemClick={(_, item) => {
          setSelectAnswer(item)
        }}
      />
    </>
  )
}

export default SelectQuiz
