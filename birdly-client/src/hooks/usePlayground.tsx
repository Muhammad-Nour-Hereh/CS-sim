import { useRef, useState } from 'react'

const usePlayground = () => {
  const [code, setCode] = useState(
    'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n',
  )

  const [output, setOutput] = useState('hello, world!')
  const [feedback, setFeedback] = useState('your code is awesome')

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

  return {
    code,
    setCode,
    output,
    setOutput,
    feedback,
    setFeedback,
    containerRef,
    split1,
    split2,
    onMouseDown,
  }
}

export default usePlayground
