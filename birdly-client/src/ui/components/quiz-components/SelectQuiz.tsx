import { SelectQuestion } from '@/interfaces/Question'
import AnswerList from '../AnswerList'
import { QuizContext, useQuiz } from '@/contexts/QuizContext'

const SelectQuiz = () => {
  const { curQuestion, setSelectAnswer }: QuizContext = useQuiz()
  if (!curQuestion || !curQuestion.content) {
    return <p>Loading...</p>
  }
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
