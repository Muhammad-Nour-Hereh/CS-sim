import { Settings, X } from 'lucide-react'
import { Button } from '../components/Button'
import { Progress } from '../components/Progress'
import Quiz from '../components/Quiz'
import IconButton from '../components/IconButton'

const QuizPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-[#0d1117]">
      {/* Top */}
      <header className="flex h-18 items-end justify-center gap-6">
        <div className="flex items-center justify-center gap-6">
          <IconButton>
            <X />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <Progress value={30} />
        </div>
      </header>

      {/* Middle */}
      <main className="flex flex-1 flex-col items-center justify-center space-y-6 bg-blue-900">
        <Quiz title="question 1" content="abc" type="select" />
      </main>

      {/* Bottom */}
      <footer className="flex h-33 items-center justify-evenly border-t-2">
        <Button variant="ghost">Skip</Button>
        <Button>Check</Button>
      </footer>
    </div>
  )
}

export default QuizPage
