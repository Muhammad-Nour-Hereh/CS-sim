import { Input } from '../Input'

interface SelectQuizProps {
  title: string
  content: any
}

const SelectQuiz = ({ title, content }: SelectQuizProps) => {
  console.log(content)

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>

      <Input className="w-150" placeholder="write your solution" />
    </>
  )
}

export default SelectQuiz
