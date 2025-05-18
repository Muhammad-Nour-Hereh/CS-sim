import { SnippetContext, useSnippet } from '@/contexts/SnippetContext'
import { ROUTES } from '@/routes/routes'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const usePlayground = () => {
  const {
    snippets,
    curSnippetId,
    setCurSnippetId,
    runSnippet,
    sendChat,
    createSnippet,
    updateSnippet,
    deleteSnippet,
  }: SnippetContext = useSnippet()

  const navigate = useNavigate()
  //  states
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [chatbotOn, setChatbotOn] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [saveStatus, setSaveStatus] = useState<'' | 'saving ...' | 'saved'>('')
  const [runStatus, setRunStatus] = useState<'' | 'running ...' | 'done'>('')
  const [feedbackStatus, setFeedbackStatus] = useState<
    'listening...' | 'thinking ...' | ''
  >('')

  // resizing states
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef<boolean>(false)
  const draggingTarget = useRef<'split1' | 'split2' | 'splitV' | null>(null)

  const [split1, setSplit1] = useState(50)
  const [split2, setSplit2] = useState(75)
  const [splitV, setSplitV] = useState(20)

  // resizing logic
  const onMouseDown = (target: 'split1' | 'split2' | 'splitV' | null) => () => {
    isDragging.current = true
    draggingTarget.current = target
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    // Prevent text selection during drag
    document.body.classList.add('no-select')
  }

  const onMouseMove = (e: { clientY: number; clientX: number }) => {
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

    // Re-enable text selection
    document.body.classList.remove('no-select')
  }

  // side menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  // handles
  const runHandle = async () => {
    if (curSnippetId === null) return
    setRunStatus('running ...')
    const _output = await runSnippet()
    setRunStatus('done')
    if (_output) setOutput(_output)
  }

  const menuHandle = () => {
    setIsSideMenuOpen(true)
  }

  const minimizeMenuHandle = () => {
    setIsSideMenuOpen(false)
  }

  const navigateHomeHandle = () => {
    navigate(ROUTES.HOME)
  }

  const snippetSelectHandle = (index: number) => {
    if (snippets.length === 0) return
    setCurSnippetId(snippets[index].id)
    setSelectedIndex(index)
    setCode(snippets[index].code)
    setTitle(snippets[index].title)
  }

  const ChangeNameHandle = (value: string) => {
    setTitle(value)
    updateSnippet(value, code)
  }

  const saveHandle = async () => {
    if (curSnippetId === null) return
    setSaveStatus('saving ...')
    await updateSnippet(title, code)
    setSaveStatus('saved')
  }

  const createSnippetHandle = () => {
    createSnippet()
  }

  const deleteSnippetHandle = (id: number) => {
    deleteSnippet(id)
  }

  const toggleChatbotHandle = () => {
    setChatbotOn((prev) => !prev)
  }

  // useEffect methods
  const feedbackUpdate = async () => {
    const res = await sendChat()
    if (res) {
      setFeedback(res)
    }
  }

  // useEffect
  useEffect(() => {
    if (snippets.length === 0) return

    // If current snippet still exists, do nothing
    const stillExists = snippets.find((s) => s.id === curSnippetId)
    if (stillExists) return

    // Else, default to the first one
    const index = 0
    setSelectedIndex(index)
    setCurSnippetId(snippets[index].id)
    setCode(snippets[index].code)
    setTitle(snippets[index].title)
  }, [snippets])

  useEffect(() => {
    // stop debouncing
    if (curSnippetId === null) return
    setSaveStatus('')
    setFeedbackStatus('listening...')
    const timeout = setTimeout(async () => {
      setSaveStatus('saving ...')
      await updateSnippet(title, code)
      setSaveStatus('saved')
    }, 1000)

    return () => clearTimeout(timeout)
  }, [code])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setFeedbackStatus('thinking ...')
      if (chatbotOn) await feedbackUpdate()
      setFeedbackStatus('')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [code])

  return {
    code,
    setCode,
    output,
    feedback,
    chatbotOn,
    saveStatus,
    runStatus,
    feedbackStatus,
    containerRef,
    split1,
    split2,
    splitV,
    onMouseDown,
    selectedIndex,
    isSideMenuOpen,
    runHandle,
    menuHandle,
    minimizeMenuHandle,
    navigateHomeHandle,
    snippetSelectHandle,
    ChangeNameHandle,
    saveHandle,
    createSnippetHandle,
    deleteSnippetHandle,
    toggleChatbotHandle,
  }
}

export default usePlayground
