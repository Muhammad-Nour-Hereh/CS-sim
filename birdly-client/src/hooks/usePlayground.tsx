import { SnippetContext, useSnippet } from '@/contexts/SnippetContext'
import { ROUTES } from '@/objects/routes'
import { remote } from '@/remotes/remotes'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const usePlayground = () => {
  const {
    snippets,
    setCurSnippetId,
    runSnippet,
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
  const [saveStatus, setSaveStatus] = useState('')
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

    // Prevent text selection during drag
    document.body.classList.add('no-select')
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

    // Re-enable text selection
    document.body.classList.remove('no-select')
  }

  // side menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  // handles
  const runHandle = async () => {
    const _output = await runSnippet()
    if (_output) setOutput(_output)
  }

  const menuHandle = () => {
    console.log('menu clicked')
    setIsSideMenuOpen(true)
  }

  const minmizeMenuHandle = () => {
    console.log('minmize menu clicked')
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

  const saveHandle = () => {
    updateSnippet(title, code)
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
    const res: any = await remote.chat(code)
    if (res.response) {
      setFeedback(res.response)
    }
  }

  // useEffect
  useEffect(() => {
    if (snippets.length === 0) return
    const index = 0
    setSelectedIndex(index)
    setCurSnippetId(snippets[index].id)
    setCode(snippets[index].code)
    setTitle(snippets[index].title)
  }, [snippets])

  useEffect(() => {
    // stop debouncing
    const timeout = setTimeout(() => {
      updateSnippet(title, code)
      if (chatbotOn) feedbackUpdate()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [code])

  return {
    code,
    setCode,
    output,
    feedback,
    chatbotOn,
    snippets,
    containerRef,
    split1,
    split2,
    splitV,
    onMouseDown,
    isSideMenuOpen,
    selectedIndex,
    runHandle,
    menuHandle,
    minmizeMenuHandle,
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
