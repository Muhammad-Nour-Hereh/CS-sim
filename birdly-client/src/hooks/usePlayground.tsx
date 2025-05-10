import { useRef, useState } from 'react'

const usePlayground = () => {
  // temp states
  const [code, setCode] = useState(
    'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n',
  )
  const [output, setOutput] = useState('hello, world!')
  const [feedback, setFeedback] = useState('your code is awesome')

  // resizing states
  const containerRef: any = useRef(null)

  const [split1, setSplit1] = useState(50)
  const [split2, setSplit2] = useState(75)
  const [splitV, setSplitV] = useState(20)

  const isDragging: any = useRef(false)
  const draggingTarget: any = useRef(null)

  // resizing logic
  const onMouseDown = (target: any) => () => {
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

    const containerLeft = containerRef.current.getBoundingClientRect().left
    const containerWidth = containerRef.current.offsetWidth
    const x = e.clientX - containerLeft
    const xPercent = (x / containerWidth) * 100

    if (draggingTarget.current === 'split1') {
      const clamped = Math.min(split2 - 10, Math.max(10, yPercent))
      setSplit1(clamped)
    } else if (draggingTarget.current === 'split2') {
      const clamped = Math.max(split1 + 10, Math.min(90, yPercent))
      setSplit2(clamped)
    } else if (draggingTarget.current === 'splitV') {
      const clamped = Math.min(90, Math.max(10, xPercent))
      setSplitV(clamped)
    }
  }

  const onMouseUp = () => {
    isDragging.current = false
    draggingTarget.current = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  // side menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  // handles
  const runHandle = () => {
    console.log('run clicked')
  }

  const menuHandle = () => {
    console.log('menu clicked')
    setIsSideMenuOpen(true)
  }

  const minmizeMenuHandle = () => {
    console.log('minmize menu clicked')
    setIsSideMenuOpen(false)
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
    splitV,
    onMouseDown,
    runHandle,
    menuHandle,
    minmizeMenuHandle,
    isSideMenuOpen,
  }
}

export default usePlayground
