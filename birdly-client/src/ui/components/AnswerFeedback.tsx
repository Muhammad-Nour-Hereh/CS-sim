import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from './Button'

const feedbackVariants = cva(
  'flex w-full items-center justify-between p-6 font-bold animate-slide-up shadow-xl transition-all',
  {
    variants: {
      variant: {
        correct: 'bg-slate-800 text-primary',
        wrong: 'bg-slate-800 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'correct',
    },
  },
)

const iconVariants = cva('h-8 w-8', {
  variants: {
    variant: {
      correct: 'text-primary',
      wrong: 'text-destructive',
    },
  },
})

const buttonVariants = cva('rounded-md px-6 py-2 text-sm font-medium', {
  variants: {
    variant: {
      correct: 'bg-primary text-slate-900 hover:bg-lime-500',
      wrong: 'bg-destructive text-white hover:bg-red-500',
    },
  },
})

interface AnswerFeedbackProps extends VariantProps<typeof feedbackVariants> {
  subtitle?: string
  onContinue?: () => void
  onReport?: () => void
  className?: string
}

function AnswerFeedback({
  variant = 'correct',
  subtitle,
  onContinue,
  onReport,
  className,
}: AnswerFeedbackProps) {
  const Icon = variant === 'correct' ? CheckCircle : XCircle
  const title = variant === 'correct' ? 'Correct Answer' : 'Wrong Answer'

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-50 w-full',
        feedbackVariants({ variant }),
        className,
      )}>
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full">
          <Icon className={iconVariants({ variant })} />
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {onReport && (
          <button
            onClick={onReport}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            REPORT
          </button>
        )}
        {onContinue && (
          <Button onClick={onContinue} className={buttonVariants({ variant })}>
            CONTINUE
          </Button>
        )}
      </div>
    </div>
  )
}

export default AnswerFeedback
