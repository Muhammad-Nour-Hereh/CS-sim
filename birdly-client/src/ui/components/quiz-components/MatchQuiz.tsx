import { MatchQuestion } from '@/interfaces/question'
import AnswerList from '../AnswerList'
import { useQuiz } from '@/contexts/QuizContext'

const MatchQuiz = () => {
  const { curQuestion, setMatchAnswer } = useQuiz()

  const {
    title,
    content: { pairs },
  } = curQuestion as MatchQuestion

  const left = pairs.map(pair => pair.left)
  const right = pairs.map(pair => pair.right)

  return (
    <>
      <h1 className="self-start text-2xl font-bold">{title}</h1>
      <div className="flex w-150 gap-4 py-4">
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList
            items={right}
            className="h-50 w-full"
            onItemClick={(_, item) => {
              setMatchAnswer(([first] = ['', '']) => [first, item])
            }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList
            items={left}
            className="h-50 w-full"
            onItemClick={(_, item) => {
              setMatchAnswer(([_, second] = ['', '']) => [item, second])
            }}
          />
        </div>
      </div>
    </>
  )
}

export default MatchQuiz
