import { isValidElement, ReactElement } from 'react'

interface IconButtonProps {
  children: ReactElement
}

const IconButton = ({ children }: IconButtonProps) => {
  let iconName = 'icon'

  if (isValidElement(children) && typeof children.type === 'function') {
    iconName = children.type.name ?? 'icon'
  }

  return (
    <button
      className="text-border flex size-8 items-center justify-center rounded-md filter transition hover:brightness-140 active:brightness-90"
      aria-label={iconName}>
      {children}
    </button>
  )
}

export default IconButton
