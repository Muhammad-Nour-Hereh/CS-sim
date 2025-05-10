import { useRef, useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'

const Playground = () => {
  const [code, setCode] = useState(
    'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n',
  )

  const [output, SetOutput] = useState('hello, world!')
  const [feedback, SetFeedback] = useState('your code is awesome')

  const containerRef: any = useRef(null)

  // Split positions in percent
  const [split1, setSplit1] = useState(50) // top splitter Y%
  const [split2, setSplit2] = useState(75) // bottom splitter Y%

  const isDragging: any = useRef(false)
  const draggingTarget: any = useRef(null)

  const onMouseDown = (target: any) => (e: any) => {
    isDragging.current = true
    draggingTarget.current = target
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: any) => {
    if (!isDragging.current || !containerRef.current) return
    const containerTop = containerRef.current.getBoundingClientRect().top
    const containerHeight = containerRef.current.offsetHeight
    const y = e.clientY - containerTop
    const yPercent = (y / containerHeight) * 100

    if (draggingTarget.current === 'split1') {
      const clamped = Math.min(split2 - 10, Math.max(10, yPercent))
      setSplit1(clamped)
    } else if (draggingTarget.current === 'split2') {
      const clamped = Math.max(split1 + 10, Math.min(90, yPercent))
      setSplit2(clamped)
    }
  }

  const onMouseUp = () => {
    isDragging.current = false
    draggingTarget.current = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <main
      ref={containerRef}
      className="flex h-screen w-screen flex-col bg-[#1a2b30] p-6">
      <section
        className="flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42]"
        style={{ height: `${split1}%` }}>
        <CodeEditor code={code} setCode={setCode} />
      </section>

      <div
        onMouseDown={onMouseDown('split1')}
        className="h-6 cursor-row-resize"
      />

      <section
        style={{ height: `${split2 - split1}%` }}
        className="flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">output:</span>
        <p>{output}</p>
      </section>

      <div
        onMouseDown={onMouseDown('split2')}
        className="h-6 cursor-row-resize"
      />
      <section
        style={{ height: `${100 - split2}%` }}
        className="flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">birdly feedback:</span>
        <p>{feedback}</p>
      </section>
    </main>
  )
}

export default Playground
