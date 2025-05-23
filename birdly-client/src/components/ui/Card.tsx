'use client'

import type React from 'react'

import { useState } from 'react'
import { cn } from '@/utils/utils'

type CardVariant = 'default' | 'highlighted' | 'clicked'

interface CardProps {
  variant?: CardVariant
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  interactive?: boolean
}

const Card = ({
  variant = 'default',
  className,
  children,
  onClick,
  interactive = true,
}: CardProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (interactive) {
      setIsClicked(!isClicked)
      if (onClick) onClick()
    }
  }

  // Determine the current variant based on props and state
  const currentVariant = isClicked ? 'clicked' : variant

  return (
    <div
      className={cn(
        'relative flex h-32 w-32 items-center justify-center rounded-lg transition-all duration-200',
        // Default variant
        currentVariant === 'default' &&
          'border border-dashed border-purple-500 bg-[#1a1f24] text-gray-500',
        // Highlighted variant
        currentVariant === 'highlighted' &&
          'border-2 border-[#3b8ea5] bg-[#1e2a31] text-[#3b8ea5]',
        // Clicked variant
        currentVariant === 'clicked' &&
          'border border-dashed border-purple-500 bg-[#1a1f24] text-gray-400',
        interactive && 'cursor-pointer',
        className,
      )}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}>
      {children || (currentVariant === 'clicked' ? 'clicked card' : 'card')}
    </div>
  )
}
export default Card
