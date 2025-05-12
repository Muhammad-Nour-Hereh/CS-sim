import { WriteQuestion } from "@/interfaces/question"
import { Input } from "../Input"

const WriteQuiz = ({ question }: { question: WriteQuestion }) => {
  // prettier-ignore
  const { title, content: { correctAnswer } } = question
  console.log(correctAnswer)

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <Input className="w-150" placeholder="write your solution" />
    </>
  )
}

export default WriteQuiz
