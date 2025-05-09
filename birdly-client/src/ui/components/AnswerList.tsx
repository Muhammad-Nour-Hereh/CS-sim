import { useState } from "react"
import { cn } from "@/lib/utils"

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
    <ol className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isSelected = selectedIndex === index

        return (
          <li
            key={index}
            className={cn(
              "flex items-stretch border-2 rounded-lg p-4",
              // "transition-all duration-200 ease-in-out",
              "cursor-pointer",
              // "hover:border hover:bg",
              isSelected ? "border-slate-500 bg shadow-sm" : "border bg",
            )}
            onClick={() => handleItemClick(index, item)}
            role="button"
            aria-pressed={isSelected}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleItemClick(index, item)
                e.preventDefault()
              }
            }}
          >
            {/* ring for number */}
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-sm border-2",
                // "transition-colors duration-200",
                isSelected ? "border bg" : "border bg",
              )}
            >
              <span className={cn("text-md font-bold", isSelected ? "" : "")}>
                {index + 1}
              </span>
            </div>

            <div className={cn("ml-4 flex-1 self-center")}>{item}</div>
          </li>
        )
      })}
    </ol>
  )
}

export default AnswerList
