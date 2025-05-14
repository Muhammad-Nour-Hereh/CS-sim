import { WriteQuestion } from '@/interfaces/Question'
import { Input } from '../Input'
import { useQuiz } from '@/contexts/QuizContext'

const WriteQuiz = () => {
  const { curQuestion, setWriteAnswer } = useQuiz()

  const { title } = curQuestion as WriteQuestion

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <Input
        className="w-150"
        placeholder="write your solution"
        setter={setWriteAnswer}
      />
    </>
  )
}

export default WriteQuiz
