import { cn } from "@/lib/utils"

interface AnswerListProps {
  items: string[]
}

const AnswerList = ({
  items
}: AnswerListProps) => {
  return (
    <ol className={cn("space-y-4")}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn("flex items-stretch border-2 rounded-lg p-4 bg")}
        >
          {/* ring for number */}
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-sm border-2 bg",
            )}
          >
            <span className={cn("text-md font-bold text-border")}>{index + 1}</span>
          </div>
          
          <div className={cn("ml-4 flex-1 self-center")}>{item}</div>
        </li>
      ))}
    </ol>
  )
}
export default AnswerList