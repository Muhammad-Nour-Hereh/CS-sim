import { WriteQuestion } from '@/interfaces/question'
import { Input } from '../Input'
import { useQuiz } from '@/contexts/QuizContext'

const WriteQuiz = () => {
  const { curQuestion, setWriteAnswer: setWrite } = useQuiz()

  const { title } = curQuestion as WriteQuestion

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <Input
        className="w-150"
        placeholder="write your solution"
        setter={setWrite}
      />
    </>
  )
}

export default WriteQuiz
