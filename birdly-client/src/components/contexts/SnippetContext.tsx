import { Snippet } from '@/interfaces/Snippet'
import { remote } from '@/remotes/remotes'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type SnippetContext = {
  loading: boolean
  initialLoading: boolean
  snippets: Snippet[]
  curSnippetId: number | null
  setCurSnippetId: Function
  runSnippet: Function
  sendChat: Function
  updateSnippet: Function
  createSnippet: Function
  deleteSnippet: Function
}

const snippetContext = createContext<SnippetContext | undefined>(undefined)

const SnippetProvider = ({ children }: { children: ReactNode }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [curSnippetId, setCurSnippetId] = useState<number | null>(null)
  const [initialLoading, setInitialLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const runSnippet = async (): Promise<string> => {
    if (!curSnippetId) return ''
    const res = await remote.snippet.run(curSnippetId)
    const _output = res.data?.output
    return _output ?? ''
  }

  const updateSnippet = async (title: string, code: string) => {
    if (!curSnippetId) return
    // Find snippet index
    const index = snippets.findIndex((s) => s.id === curSnippetId)
    if (index === -1) return // not found

    // Update snippet in memory
    const updated = [...snippets]
    updated[index] = { ...updated[index], title, code }
    setSnippets(updated)

    // update snippet in backend
    await remote.snippet.update(curSnippetId, {
      title: title,
      language: 'python',
      code: code,
    })
  }

  const createSnippet = () => {
    remote.snippet.create('snippet', 'python', '# try print("hello, birdly")')
    fetchSnippets()
  }

  const deleteSnippet = (id: number) => {
    remote.snippet.delete(id)
    if (curSnippetId === id) setCurSnippetId(null)
    fetchSnippets()
  }

  const fetchSnippets = async (isInitial = false) => {
    if (isInitial) setInitialLoading(true)
    setLoading(true)

    const res = await remote.snippet.getAll()
    const updatedSnippets = res.data

    if (res.success === 'false' || !updatedSnippets) {
      setLoading(false)
      if (isInitial) setInitialLoading(false)
      return
    }

    setSnippets(updatedSnippets)

    setCurSnippetId((prev) => {
      if (!prev) return null
      const stillExists = updatedSnippets.some((s) => s.id === prev)
      return stillExists ? prev : null
    })

    if (isInitial) setInitialLoading(false)
    setLoading(false)
  }

  const sendChat = async () => {
    if (!curSnippetId) return
    return (await remote.snippet.chat(curSnippetId)).data?.response
  }

  useEffect(() => {
    fetchSnippets(true)
  }, [])

  return (
    <snippetContext.Provider
      value={{
        initialLoading,
        loading,
        snippets,
        curSnippetId,
        setCurSnippetId,
        runSnippet,
        sendChat,
        createSnippet,
        updateSnippet,
        deleteSnippet,
      }}>
      {children}
    </snippetContext.Provider>
  )
}

export const useSnippet = () => {
  const context = useContext(snippetContext)

  if (!context) {
    throw Error(
      'useSnippet hook can only be used in an SnippetProvider context',
    )
  }

  return context
}

export default SnippetProvider
