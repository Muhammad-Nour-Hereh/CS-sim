import { cn } from '@/utils/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from './Button'

const feedbackVariants = cva(
  'fixed bottom-0 left-0 z-50 flex h-33 w-full items-center justify-around p-6 font-bold border-t-2 bg-[#202F36]',
  {
    variants: {
      variant: {
        correct: 'text-primary',
        almost: 'text-primary',
        wrong: 'text-destructive',
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
  const Icon = variant === 'wrong' ? XCircle : CheckCircle
  const title = variant === 'wrong' ? 'Wrong Answer' : 'Correct Answer'
  const buttonVariant = variant === 'wrong' ? 'destructive' : 'default'

  return (
    <div className={cn(feedbackVariants({ variant }), className)}>
      <div className="flex items-center gap-4">
        <Icon className="flex size-16 h-10 w-10 items-center justify-center" />
        <div>
          <h3 className="text-2xl font-extrabold">{title}</h3>
          {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
        </div>
      </div>
      <Button onClick={onContinue} variant={buttonVariant}>
        CONTINUE
      </Button>
    </div>
  )
}

export default AnswerFeedback
