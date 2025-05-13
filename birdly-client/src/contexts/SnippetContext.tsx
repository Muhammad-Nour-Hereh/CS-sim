import { Snippet } from '@/interfaces/Snippet'
import { remote } from '@/remotes/remotes'
import { createContext, useContext, useEffect, useState } from 'react'

export type SnippetContext = {
  snippets: Snippet[]
  setCurSnippetId: Function
}

const snippetContext = createContext<SnippetContext | undefined>(undefined)

const SnippetProvider = ({ children }: any) => {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [curSnippetId, setCurSnippetId] = useState<number>(-1)

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
    <snippetContext.Provider value={{ snippets, setCurSnippetId }}>
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
