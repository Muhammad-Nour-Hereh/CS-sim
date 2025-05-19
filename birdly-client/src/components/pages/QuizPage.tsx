import { Settings, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import Quiz from '../ui/Quiz'
import IconButton from '../ui/IconButton'
import useQuizPage from '@/components/hooks/useQuizPage'
import AnswerFeedback from '../ui/AnswerFeedback'
import LoadingPage from './LoadingPage'

const QuizPage = () => {
  const {
    loading,
    progressPercent,
    showFeedback,
    result,
    checkable,
    skipAnswer,
    naivgateHomeHandle,
    checkHandle,
    FeedbackHandle,
    subtitle,
  } = useQuizPage()

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="flex h-screen w-screen flex-col items-center bg-[#0d1117]">
      {/* Top */}
      <header className="flex h-18 items-end justify-center gap-6">
        <div className="flex items-center justify-center gap-6">
          <IconButton onClick={naivgateHomeHandle} className="text-gray-500">
            <X />
          </IconButton>
          <IconButton className="text-gray-500">
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
        <Button variant="ghost" onClick={skipAnswer}>
          Skip
        </Button>
        <Button onClick={checkHandle} variant={checkable ? 'default' : 'muted'}>
          Check
        </Button>
      </footer>

      {showFeedback && (
        <AnswerFeedback
          variant={result}
          onContinue={FeedbackHandle}
          subtitle={subtitle}
        />
      )}
    </div>
  )
}

export default QuizPage
