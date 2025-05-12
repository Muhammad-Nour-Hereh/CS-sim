import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from './Button'

const answerFeedbackVariants = cva('font-bold', {
  variants: {
    variant: {
      correct: 'text-primary ',
      wrong: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'correct',
  },
})

interface AnswerFeedbackProps {
  variant: 'success' | 'error'
  title: string
  subtitle?: string
  rating?: string
  onContinue?: () => void
  onReport?: () => void
  className?: string
}

function AnswerFeedback({
  variant,
  title,
  subtitle,
  rating,
  onContinue,
  onReport,
  className,
}: AnswerFeedbackProps) {
  const isSuccess = variant === 'success'

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between rounded-md bg-slate-800 p-6',
        className,
      )}>
      <div className="flex w-full items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            {isSuccess ? (
              <CheckCircle className="h-8 w-8 text-lime-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-400" />
            )}
          </div>
          <div>
            <h3
              className={cn(
                'font-medium',
                isSuccess ? 'text-lime-400' : 'text-red-400',
              )}>
              {title}
            </h3>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
            {rating && <p className="text-sm text-slate-400">{rating}</p>}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {onReport && (
            <button
              onClick={onReport}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300">
              <span className="h-4 w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </span>
              REPORT
            </button>
          )}

          {onContinue && (
            <Button
              onClick={onContinue}
              className={cn(
                'rounded-md px-6 py-2 text-sm font-medium',
                isSuccess
                  ? 'bg-lime-400 text-slate-900 hover:bg-lime-500'
                  : 'bg-red-400 text-white hover:bg-red-500',
              )}>
              CONTINUE
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnswerFeedback
