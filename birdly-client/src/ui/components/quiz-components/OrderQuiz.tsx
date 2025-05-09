interface OrderQuizProps {
    title: string
    content: any
}

const OrderQuiz = ({ title, content }: OrderQuizProps) => {
    return (
        <>
            <h1>{title}</h1>
            <div>OrderQuiz </div>
            <div>{content} </div>
        </>
    )
}

export default OrderQuiz