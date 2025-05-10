interface WriteQuizProps {
  title: string
  content: any
}

const WriteQuiz = ({ title, content }: WriteQuizProps) => {
  return (
    <>
      <h1>{title}</h1>
      <div>WriteQuiz </div>
      <div>{content} </div>
    </>
  )
}

export default WriteQuiz
