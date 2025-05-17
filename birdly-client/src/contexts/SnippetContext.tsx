import { Snippet } from '@/interfaces/Snippet'
import { remote } from '@/remotes/remotes'
import { createContext, useContext, useEffect, useState } from 'react'

export type SnippetContext = {
  loading: boolean
  snippets: Snippet[]
  setCurSnippetId: Function
  runSnippet: Function
  sendChat: Function
  updateSnippet: Function
  createSnippet: Function
  deleteSnippet: Function
}

const snippetContext = createContext<SnippetContext | undefined>(undefined)

const SnippetProvider = ({ children }: any) => {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [curSnippetId, setCurSnippetId] = useState<number>(-1)
  const [loading, setLoading] = useState(true)

  const runSnippet = async (): Promise<string> => {
    const res = await remote.snippet.run(curSnippetId)
    const _output = res.data?.output
    return _output ?? ''
  }

  const updateSnippet = async (title: string, code: string) => {
    if (curSnippetId == -1) return
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
    fetchSnippets()
  }

  const fetchSnippets = async () => {
    setLoading(true)
    const res = await remote.snippet.getAll()
    if (res.success === 'true' && res.data) {
      setSnippets(res.data)
    }
    setLoading(false)
  }

  const sendChat = async () => {
    return (await remote.snippet.chat(curSnippetId)).data?.response
  }

  useEffect(() => {
    fetchSnippets()
  }, [])

  return (
    <snippetContext.Provider
      value={{
        loading,
        snippets,
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
