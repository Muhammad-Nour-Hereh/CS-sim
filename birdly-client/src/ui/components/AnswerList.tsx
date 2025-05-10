import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AnswerListProps {
  items: string[]
  onItemClick?: (index: number, item: string) => void
  className?: string
}

const AnswerList = ({ items, onItemClick, className }: AnswerListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleItemClick = (index: number, item: string) => {
    setSelectedIndex(index)
    onItemClick?.(index, item)
  }

  return (
    <ol className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const isSelected = selectedIndex === index

        return (
          <li
            key={index}
            className={cn(
              'flex h-14 w-150 items-center rounded-lg border-1 border-b-4 pl-4',
              'transition-all duration-100 ease-in-out',
              'cursor-pointer',
              // "hover:border hover:bg",
              isSelected
                ? 'bg border-1 border-slate-500 shadow-sm'
                : 'bg border-1 border-b-4',
            )}
            onClick={() => handleItemClick(index, item)}
            role="button"
            aria-pressed={isSelected}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemClick(index, item)
                e.preventDefault()
              }
            }}>
            {/* ring for number */}
            <div
              className={cn(
                'flex size-7.5 items-center justify-center rounded-sm border-2',
                // "transition-colors duration-200",
                isSelected ? 'bg border' : 'bg border',
              )}>
              <span className={cn('text-md font-bold', isSelected ? '' : '')}>
                {index + 1}
              </span>
            </div>

            <div className={cn('ml-4 flex-1 self-center')}>{item}</div>
          </li>
        )
      })}
    </ol>
  )
}

export default AnswerList
