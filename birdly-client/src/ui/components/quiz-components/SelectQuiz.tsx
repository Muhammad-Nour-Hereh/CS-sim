interface SelectQuizProps {
    title: string
    content: any
}

const SelectQuiz = ({ title, content }: SelectQuizProps) => {
    return (
        <>
            <h1>{title}</h1>
            <div>SelectQuiz </div>
            <div>{content} </div>
        </>
    )
}

export default SelectQuiz