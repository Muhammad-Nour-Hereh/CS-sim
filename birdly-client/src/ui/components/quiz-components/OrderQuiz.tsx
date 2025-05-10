import { useState } from 'react'
import { Button } from '../Button'

interface OrderQuizProps {
  title: string
  content: any
}

const OrderQuiz = ({ title, content }: OrderQuizProps) => {
  console.log(content)

  const [topButtons, setTopButtons] = useState(['a', 'b', 'c'])
  const [bottomButtons, setBottomButtons] = useState(['d', 'e', 'f'])

  const moveButton = (label: string, fromTop: boolean) => {
    if (fromTop) {
      setTopButtons(topButtons.filter((b) => b !== label))
      setBottomButtons([...bottomButtons, label])
    } else {
      setBottomButtons(bottomButtons.filter((b) => b !== label))
      setTopButtons([...topButtons, label])
    }
  }

  return (
    <>
      <p className="text-2xl font-extrabold">{title}</p>
      <div className="flex h-16 w-150 items-center gap-2 border-y-2 p-2">
        {topButtons.map((label) => (
          <Button
            key={label}
            className="w-fit"
            onClick={() => moveButton(label, true)}>
            {label}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {bottomButtons.map((label) => (
          <Button
            key={label}
            className="w-fit"
            onClick={() => moveButton(label, false)}>
            {label}
          </Button>
        ))}
      </div>
    </>
  )
}

export default OrderQuiz
