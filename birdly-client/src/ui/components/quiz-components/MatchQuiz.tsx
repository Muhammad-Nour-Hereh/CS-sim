import { MatchQuestion } from '@/interfaces/question'
import Card from '../Card'

const MatchQuiz = ({ question }: { question: MatchQuestion }) => {
  // prettier-ignore
  const { title, content: { pairs } } = question
  console.log(pairs)
  return (
    <>
      <h1 className="self-start text-2xl font-bold">{title}</h1>
      <div className="flex w-150 gap-4 py-4">
        <div className="flex flex-1 flex-col gap-4">
          {' '}
          <Card>1</Card>
          <Card>2</Card>
          <Card>3</Card>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {' '}
          <Card>a</Card>
          <Card>b</Card>
          <Card>c</Card>
        </div>
      </div>

      {/* <div>{content[0][0]} </div> */}
    </>
  )
}

export default MatchQuiz
