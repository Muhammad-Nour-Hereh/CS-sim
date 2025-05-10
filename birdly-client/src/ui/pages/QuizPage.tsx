import { Settings, X } from "lucide-react"
import { Button } from "../components/Button"
import { Progress } from "../components/Progress"
import Quiz from "../components/Quiz"
import IconButton from "../components/IconButton"

const QuizPage = () => {
    return (
        <div className="h-screen w-screen flex flex-col bg-[#0d1117] text-white">
            {/* Top */}
            <header className="h-12 flex items-center justify-center pt-10 gap-6">
                <IconButton>
                    <X />
                </IconButton>

                <IconButton>
                    <Settings />
                </IconButton>


                <Progress value={30} />
            </header>

            {/* Middle */}
            <main className="flex-1 flex flex-col justify-center items-center space-y-6">
                <Quiz title="question 1" content="abc" type="select" />
            </main>

            {/* Bottom */}
            <footer className="h-33 flex justify-evenly items-center border-t-2">
                <Button variant="ghost">Skip</Button>
                <Button >Check</Button>
            </footer>
        </div>
    )
}


export default QuizPage