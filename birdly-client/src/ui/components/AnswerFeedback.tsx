import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from './Button'

const feedbackVariants = cva(
  'flex w-full items-center justify-around p-6 font-bold animate-slide-up animate-slide-down transition-all',
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

interface AnswerFeedbackProps extends VariantProps<typeof feedbackVariants> {
  subtitle?: string
  onContinue?: () => void
  className?: string
}

function AnswerFeedback({
  variant = 'correct',
  subtitle,
  onContinue,
  className,
}: AnswerFeedbackProps) {
  const Icon = variant === 'correct' ? CheckCircle : XCircle
  const title = variant === 'correct' ? 'Correct Answer' : 'Wrong Answer'
  const buttonVariant = variant === 'correct' ? 'default' : 'destructive'

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-50 w-full',
        feedbackVariants({ variant }),
        className,
      )}>
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full">
          <Icon className={'size-16'} />
        </div>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>

      {onContinue && (
        <Button onClick={onContinue} variant={buttonVariant}>
          CONTINUE
        </Button>
      )}
    </div>
  )
}

export default AnswerFeedback
