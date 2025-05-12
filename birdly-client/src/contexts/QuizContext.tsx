import { createContext, useContext } from "react"

const quizContext = createContext({})

const QuizProvider = ({ children }: any) => {

        return (
            <quizContext.Provider
                value={{

                }}
            >
                {children}
            </quizContext.Provider>
        )
    }
    
    export const useQuiz = () => {
        const context = useContext(quizContext)
    
        if (!context) {
            throw Error("IsQuiz hook can only be used in an QuizProvider context")
        }
    
        return context
    }
    
    export default QuizProvider