import { useRef, useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'

const Playground = () => {
  const [code, setCode] = useState(
    'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n',
  )

  const [output, SetOutput] = useState('hello, world!')
  const [feedback, SetFeedback] = useState('your code is awesome')

  const containerRef: any = useRef(null)
  const [topHeight, setTopHeight] = useState(50) // percent
  const [middleHeight, setMiddleHeight] = useState(25)

  const isDragging = useRef(false)
  const dragSection = useRef(null)

  const startDragging = (section: any) => (e: any) => {
    isDragging.current = true
    dragSection.current = section
    document.addEventListener('mousemove', handleDragging)
    document.addEventListener('mouseup', stopDragging)
  }

  const handleDragging = (e: any) => {
    if (!isDragging.current || !containerRef.current) return
    const containerHeight = containerRef.current.offsetHeight
    const y = e.clientY - containerRef.current.getBoundingClientRect().top
    let newTopHeight, newMiddleHeight

    if (dragSection.current === 'top') {
      newTopHeight = (y / containerHeight) * 100
      newTopHeight = Math.max(10, Math.min(80, newTopHeight))
      const remaining = 100 - newTopHeight
      newMiddleHeight = Math.min(remaining - 10, middleHeight)
    }

    if (dragSection.current === 'middle') {
      newMiddleHeight = (y / containerHeight) * 100 - topHeight
      newMiddleHeight = Math.max(10, Math.min(80, newMiddleHeight))
    }

    if (newTopHeight !== undefined) setTopHeight(newTopHeight)
    if (newMiddleHeight !== undefined) setMiddleHeight(newMiddleHeight)
  }

  const stopDragging = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleDragging)
    document.removeEventListener('mouseup', stopDragging)
  }

  const bottomHeight = 100 - topHeight - middleHeight

  return (
    <main
      ref={containerRef}
      className="flex h-screen w-screen flex-col bg-[#1a2b30] p-6">
      <section
        className="flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42]"
        style={{ height: `${topHeight}%` }}>
        <CodeEditor code={code} setCode={setCode} />
      </section>

      <div
        onMouseDown={startDragging('top')}
        className="h-6 cursor-row-resize"
      />

      <section
        style={{ height: `${middleHeight}%` }}
        className="flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">output:</span>
        <p>{output}</p>
      </section>

      <div
        onMouseDown={startDragging('middle')}
        className="h-6 cursor-row-resize"
      />
      <section
        style={{ height: `${bottomHeight}%` }}
        className="flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">birdly feedback:</span>
        <p>{feedback}</p>
      </section>
    </main>
  )
}

export default Playground
