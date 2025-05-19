import { SelectQuestion } from '@/interfaces/Question'
import AnswerList from '../AnswerList'
import { QuizContext, useQuiz } from '@/components/contexts/QuizContext'

const SelectQuiz = () => {
  const { curQuestion, setSelectAnswer }: QuizContext = useQuiz()
  if (!curQuestion || !curQuestion.content) {
    return <p>Loading...</p>
  }
  const {
    title,
    content: { options },
  } = curQuestion as SelectQuestion
  console.log(options)
  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <AnswerList
        items={options}
        onItemClick={(_, item) => {
          setSelectAnswer(item)
        }}
      />
    </>
  )
}

export default SelectQuiz
