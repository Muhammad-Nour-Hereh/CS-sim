import { useState } from 'react'
import { Button } from '../Button'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuiz } from '@/contexts/QuizContext'

const OrderQuiz = () => {
  const {
    curQuestion: {
      title,
      content: { correctOrder, pieces },
    },
  }: any = useQuiz()

  console.log(title, correctOrder, pieces)

  const [topButtons, setTopButtons] = useState<string[]>([])
  const [bottomButtons, setBottomButtons] = useState(pieces)

  const moveButton = (label: string, fromTop: boolean) => {
    if (fromTop) {
      setTopButtons((prev) => prev.filter((l) => l !== label))
      setBottomButtons((prev: any) => [...prev, label])
    } else {
      setBottomButtons((prev: any[]) => prev.filter((l) => l !== label))
      setTopButtons((prev) => [...prev, label])
    }
  }

  const buttonVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  }

  return (
    <>
      <p className="mb-4 self-start text-3xl font-extrabold">{title}</p>

      <div className="flex h-16 w-[600px] flex-wrap items-center gap-2 border-y-2 p-2">
        <AnimatePresence>
          {topButtons.map((label) => (
            <motion.div
              key={label}
              layout
              initial="initial"
              animate="animate"
              exit="exit"
              variants={buttonVariants}
              transition={{ duration: 0.2 }}>
              <Button className="w-fit" onClick={() => moveButton(label, true)}>
                {label}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex w-[600px] flex-wrap gap-2">
        <AnimatePresence>
          {bottomButtons.map((label: any) => (
            <motion.div
              key={label}
              layout
              initial="initial"
              animate="animate"
              exit="exit"
              variants={buttonVariants}
              transition={{ duration: 0.2 }}>
              <Button
                className="w-fit"
                onClick={() => moveButton(label, false)}>
                {label}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

export default OrderQuiz
