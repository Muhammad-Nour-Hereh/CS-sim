import { cn } from '@/utils/utils'
import { isValidElement, ReactElement } from 'react'

interface IconButtonProps {
  children: ReactElement
  className?: string
  onClick?: Function
}

const IconButton = ({ children, className, onClick }: IconButtonProps) => {
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
      onClick={(e) => onClick?.(e)}
      aria-label={iconName}>
      {children}
    </button>
  )
}

export default IconButton
