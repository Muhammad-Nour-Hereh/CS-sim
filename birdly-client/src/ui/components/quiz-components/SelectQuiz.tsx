import { SelectQuestion } from '@/interfaces/question'
import AnswerList from '../AnswerList'
import { QuizContext, useQuiz } from '@/contexts/QuizContext'

const SelectQuiz = () => {
  const { curQuestion, setSelectedAnswer }: QuizContext = useQuiz()

  const {
    title,
    content: { answers, correctAnswer },
  } = curQuestion as SelectQuestion

  console.log(correctAnswer)

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <AnswerList
        items={answers}
        onItemClick={(_, item) => {
          setSelectedAnswer(item)
        }}
      />
    </>
  )
}

export default SelectQuiz
