import { Settings, X } from 'lucide-react'
import { Button } from '../components/Button'
import { Progress } from '../components/Progress'
import Quiz from '../components/Quiz'
import IconButton from '../components/IconButton'
import useQuizPage from '@/hooks/useQuizPage'

const QuizPage = () => {
  const { progressPercent, checkHandle, naivgateHomeHandle } = useQuizPage()

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-[#0d1117]">
      {/* Top */}
      <header className="flex h-18 items-end justify-center gap-6">
        <div className="flex items-center justify-center gap-6">
          <IconButton onClick={naivgateHomeHandle}>
            <X />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <Progress value={progressPercent} />
        </div>
      </header>

      {/* Middle */}
      <main className="flex w-150 flex-1 flex-col items-center justify-around space-y-6">
        <Quiz />
      </main>

      {/* Bottom */}
      <footer className="flex h-33 w-full items-center justify-evenly border-t-2">
        <Button variant="ghost">Skip</Button>
        <Button onClick={checkHandle}>Check</Button>
      </footer>
    </div>
  )
}

export default QuizPage
