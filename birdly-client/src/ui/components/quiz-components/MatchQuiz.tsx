interface MatchQuizProps {
    title: string
    content: any
}

const MatchQuiz = ({ title, content }: MatchQuizProps) => {
    return (
        <>
            <h1>{title}</h1>
            <div>MatchQuiz </div>
            <div>{content} </div>
        </>
    )
}

export default MatchQuiz