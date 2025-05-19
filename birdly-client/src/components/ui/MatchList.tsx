import { useMemo, useEffect } from 'react'

// Utility to shuffle an array in place (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export interface Pair {
  left: string
  right: string
}

export interface MatchListProps {
  // The original pairs of matching items
  pairs: Pair[]
  // Controlled selection indices
  selectedLeftIndex: number | null
  selectedRightIndex: number | null
  // Indices of correctly matched left items (by index in left list)
  matchedLeft: Set<number>
  // Indices of correctly matched right items (by index in right list)
  matchedRight: Set<number>
  // Callbacks
  onSelectLeft: (index: number) => void
  onSelectRight: (index: number) => void
  onUnselect: () => void
  onFeedback: (correct: boolean) => void
}

const MatchList: React.FC<MatchListProps> = ({
  pairs,
  selectedLeftIndex,
  selectedRightIndex,
  matchedLeft,
  matchedRight,
  onSelectLeft,
  onSelectRight,
  onUnselect,
  onFeedback,
}) => {
  // Shuffle left and right items independently
  const leftItems = useMemo(
    () => shuffleArray(pairs.map((p) => p.left)),
    [pairs],
  )
  const rightItems = useMemo(
    () => shuffleArray(pairs.map((p) => p.right)),
    [pairs],
  )

  // When both sides selected, evaluate match
  useEffect(() => {
    if (selectedLeftIndex !== null && selectedRightIndex !== null) {
      const leftValue = leftItems[selectedLeftIndex]
      const rightValue = rightItems[selectedRightIndex]
      const isCorrect = pairs.some(
        (p) => p.left === leftValue && p.right === rightValue,
      )
      onFeedback(isCorrect)
      if (!isCorrect) {
        // wrong answer: reset selections
        onUnselect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeftIndex, selectedRightIndex])

  return (
    <div className="flex gap-6">
      {/* Left list */}
      <ol className="flex flex-col gap-2">
        {leftItems.map((item, idx) => {
          const isSelected = selectedLeftIndex === idx
          const isMatched = matchedLeft.has(idx)
          return (
            <li
              key={idx}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2 transition-all duration-100 ${isMatched ? 'cursor-not-allowed opacity-50' : ''} ${isSelected ? 'border-blue-400 bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => !isMatched && onSelectLeft(idx)}>
              <span className="font-bold">{idx + 1}.</span>
              <span className="flex-1 text-center">{item}</span>
            </li>
          )
        })}
      </ol>

      {/* Right list */}
      <ol className="flex flex-col gap-2">
        {rightItems.map((item, idx) => {
          const isSelected = selectedRightIndex === idx
          const isMatched = matchedRight.has(idx)
          return (
            <li
              key={idx}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2 transition-all duration-100 ${isMatched ? 'cursor-not-allowed opacity-50' : ''} ${isSelected ? 'border-blue-400 bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => !isMatched && onSelectRight(idx)}>
              <span className="font-bold">{idx + 1}.</span>
              <span className="flex-1 text-center">{item}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default MatchList
