import { cn } from '@/lib/utils'
import { isValidElement, ReactElement } from 'react'

interface IconButtonProps {
  children: ReactElement
  className?: string
}

const IconButton = ({ children, className }: IconButtonProps) => {
  let iconName = 'icon'

  if (isValidElement(children) && typeof children.type === 'function') {
    iconName = children.type.name ?? 'icon'
  }

  return (
    <button
      className={cn(
        'text-border flex size-8 items-center justify-center rounded-full filter transition hover:brightness-140 active:brightness-90',
        className,
      )}
      aria-label={iconName}>
      {children}
    </button>
  )
}

export default IconButton
