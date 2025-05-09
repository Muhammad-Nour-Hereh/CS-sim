import { Button } from "../components/Button"
import { Progress } from "../components/Progress"
import Quiz from "../components/Quiz"

const QuizPage = () => {
    return (
        <div className="h-screen w-screen flex flex-col bg-[#0d1117] text-white p-4 ">
            {/* Top: Progress Bar */}
            <header className="h-12 flex items-center justify-center">
                <Progress value={30} />
            </header>

            {/* Middle: Question and Answers */}
            <main className="flex-1 flex flex-col justify-center items-center space-y-6">
                <Quiz />
            </main>

            {/* Bottom: Buttons */}
            <footer className="h-33 flex justify-evenly items-center border-t-2">
                <Button variant="ghost">Skip</Button>
                <Button >Check</Button>
            </footer>
        </div>
    )
}


export default QuizPage