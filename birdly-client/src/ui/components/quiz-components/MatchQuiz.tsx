import { MatchQuestion } from '@/interfaces/question'
import AnswerList from '../AnswerList'

const MatchQuiz = ({ question }: { question: MatchQuestion }) => {
  // prettier-ignore
  const { title, content: { pairs } } = question
  console.log(pairs)
  return (
    <>
      <h1 className="self-start text-2xl font-bold">{title}</h1>
      <div className="flex w-150 gap-4 py-4">
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList items={['a', 'b', 'c']} className='w-full h-50'/>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList items={['1', '2', '3']} className='w-full h-50'/>
        </div>
      </div>

      {/* <div>{content[0][0]} </div> */}
    </>
  )
}

export default MatchQuiz
