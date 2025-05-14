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
    <ol className={cn('flex h-14 flex-col gap-2', className)}>
      {items.map((item, index) => {
        const isSelected = selectedIndex === index

        return (
          <li
            key={index}
            className={cn(
              'flex h-full w-full items-center gap-4 rounded-lg border-2 border-b-4 px-4',
              'transition-all duration-100',
              'cursor-pointer',
              'hover:brightness-120',
              isSelected ? 'border-b-2 border-slate-500' : 'border-b-4',
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
                'transition duration-200',
                isSelected ? 'border-slate-500' : '',
              )}>
              <span
                className={cn(
                  'text-md font-bold',
                  isSelected ? '' : 'text-border',
                )}>
                {index + 1}
              </span>
            </div>

            <div className={cn('flex-1 text-center')}>{item}</div>
          </li>
        )
      })}
    </ol>
  )
}

export default AnswerList
