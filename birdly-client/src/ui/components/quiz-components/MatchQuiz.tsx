import AnswerList from '../AnswerList'
import { useQuiz } from '@/contexts/QuizContext'

const MatchQuiz = () => {
  const {
    curQuestion: {
      title,
      content: { pairs },
    },
  }: any = useQuiz()

  console.log(pairs)
  return (
    <>
      <h1 className="self-start text-2xl font-bold">{title}</h1>
      <div className="flex w-150 gap-4 py-4">
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList items={['a', 'b', 'c']} className="h-50 w-full" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList items={['1', '2', '3']} className="h-50 w-full" />
        </div>
      </div>

      {/* <div>{content[0][0]} </div> */}
    </>
  )
}

export default MatchQuiz
