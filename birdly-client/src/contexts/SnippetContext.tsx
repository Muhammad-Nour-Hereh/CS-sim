import { Snippet } from '@/interfaces/Snippet'
import { remote } from '@/remotes/remotes'
import { createContext, useContext, useEffect, useState } from 'react'

export type SnippetContext = {
  snippets: Snippet[]
  setCurSnippetId: Function
  runSnippet: Function
  updateSnippet: Function
}

const snippetContext = createContext<SnippetContext | undefined>(undefined)

const SnippetProvider = ({ children }: any) => {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [curSnippetId, setCurSnippetId] = useState<number>(-1)

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

  useEffect(() => {
    const fetchSnippets = async () => {
      const res = await remote.snippet.getAll()
      if (res.success === 'true' && res.data) {
        setSnippets(res.data)
      }
    }

    fetchSnippets()
  }, [])

  return (
    <snippetContext.Provider
      value={{ snippets, setCurSnippetId, runSnippet, updateSnippet }}>
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
