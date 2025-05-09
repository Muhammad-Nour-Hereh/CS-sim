import React, { JSX } from "react"

import MatchQuiz from "./quiz-components/MatchQuiz"
import OrderQuiz from "./quiz-components/OrderQuiz"
import SelectQuiz from "./quiz-components/SelectQuiz"
import WriteQuiz from "./quiz-components/WriteQuiz"

type QuizType = "select" | "match" | "order" | "write"

interface QuizProps {
    title: string
    content: any
    type?: QuizType
}

const Quiz: React.FC<QuizProps> = ({ title, content, type = "select" }) => {
    const quizComponents: Record<QuizType, JSX.Element> = {
        select: <SelectQuiz title={title} content={content} />,
        match: <MatchQuiz title={title} content={content} />,
        order: <OrderQuiz title={title} content={content} />,
        write: <WriteQuiz title={title} content={content} />,
    }

    return quizComponents[type] || <p>Invalid quiz type: {type}</p>
}

export default Quiz