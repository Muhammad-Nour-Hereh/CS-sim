import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeEditorProps {
  code: string
  language?: string
}

export function CodeEditor({ code, language = 'python' }: CodeEditorProps) {
  return (
    <Prism
      language={language}
      style={oneDark}
      showLineNumbers={true}
      wrapLines={true}>
      {code}
    </Prism>
  )
}
