import { Input } from '../Input'
import { useQuiz } from '@/contexts/QuizContext'

const WriteQuiz = () => {
  const {
    curQuestion: {
      title,
      content: { correctAnswer },
    },
  }: any = useQuiz()
  console.log(correctAnswer)

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <Input className="w-150" placeholder="write your solution" />
    </>
  )
}

export default WriteQuiz
