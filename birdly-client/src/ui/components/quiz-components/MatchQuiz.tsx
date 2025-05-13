import { MatchQuestion } from '@/interfaces/Question'
import AnswerList from '../AnswerList'
import { useQuiz } from '@/contexts/QuizContext'

const MatchQuiz = () => {
  const { curQuestion, setMatchAnswer } = useQuiz()

  const {
    title,
    content: { pairs },
  } = curQuestion as MatchQuestion

  const left = pairs.map((pair) => pair.left)
  const right = pairs.map((pair) => pair.right)

  return (
    <>
      <h1 className="self-start text-2xl font-bold">{title}</h1>
      <div className="flex w-150 gap-4 py-4">
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList
            items={right}
            className="h-50 w-full"
            onItemClick={(_, item) => {
              setMatchAnswer((prev: any) => ({ ...prev, right: item }))
            }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AnswerList
            items={left}
            className="h-50 w-full"
            onItemClick={(_, item) => {
              setMatchAnswer((prev: any) => ({ ...prev, left: item }))
            }}
          />
        </div>
      </div>
    </>
  )
}

export default MatchQuiz

// import { useState } from 'react'
// import { MatchQuestion } from '@/interfaces/question'
// import { useQuiz } from '@/contexts/QuizContext'
// import MatchList from '../MatchList'


// const MatchQuiz = () => {
//   const { curQuestion, setMatchAnswer } = useQuiz()

//   const {
//     title,
//     content: { pairs },
//   } = curQuestion as MatchQuestion

//   const [selectedLeftIndex, setSelectedLeftIndex] = useState<number | null>(null)
//   const [selectedRightIndex, setSelectedRightIndex] = useState<number | null>(null)
//   const [matchedLeft, setMatchedLeft] = useState<Set<number>>(new Set())
//   const [matchedRight, setMatchedRight] = useState<Set<number>>(new Set())

//   const handleUnselect = () => {
//     setSelectedLeftIndex(null)
//     setSelectedRightIndex(null)
//   }

//   const handleFeedback = (correct: boolean) => {
//     if (!correct) return
//     if (selectedLeftIndex !== null && selectedRightIndex !== null) {
//       setMatchedLeft(prev => new Set(prev).add(selectedLeftIndex))
//       setMatchedRight(prev => new Set(prev).add(selectedRightIndex))
//       setMatchAnswer((prev: { answers: any }) => ({
//         ...prev,
//         answers: [
//           ...(prev.answers || []),
//           {
//             left: pairs[selectedLeftIndex].left,
//             right: pairs[selectedRightIndex].right,
//             correct: true,
//           },
//         ],
//       }))
//       handleUnselect()
//     }
//   }

//   return (
//     <>
//       <h1 className="self-start text-2xl font-bold">{title}</h1>
//       <div className="flex w-150 gap-4 py-4">
//         <MatchList
//           pairs={pairs}
//           selectedLeftIndex={selectedLeftIndex}
//           selectedRightIndex={selectedRightIndex}
//           matchedLeft={matchedLeft}
//           matchedRight={matchedRight}
//           onSelectLeft={setSelectedLeftIndex}
//           onSelectRight={setSelectedRightIndex}
//           onUnselect={handleUnselect}
//           onFeedback={handleFeedback}
//         />
//       </div>
//     </>
//   )
// }

// export default MatchQuiz