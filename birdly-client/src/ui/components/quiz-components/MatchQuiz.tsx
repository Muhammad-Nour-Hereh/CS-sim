import { MatchQuestion } from "@/interfaces/question"

const MatchQuiz = ({ question }: { question: MatchQuestion }) => {
  // prettier-ignore
  const { title, content: { pairs } } = question
  console.log(pairs)
  return (
    <>
      <h1>{title}</h1>
      <div>MatchQuiz </div>
      {/* <div>{content[0][0]} </div> */}
    </>
  )
}

export default MatchQuiz
