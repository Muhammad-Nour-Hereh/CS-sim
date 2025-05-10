import { Input } from "../Input"

interface WriteQuizProps {
  title: string
  content: any
}

const WriteQuiz = ({ title, content }: WriteQuizProps) => {
  console.log(content)

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <Input className="w-150" placeholder="write your solution" />
    </>
  )
}

export default WriteQuiz
