import { useState } from 'react'
import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeEditorProps {
  code: string
  language?: string
}

export function CodeEditor({ code, language = 'python' }: CodeEditorProps) {
    const [_code, SetCode] = useState(code)
  return (
    <Prism
      language={language}
      style={oneDark}
      showLineNumbers={true}
      wrapLines={true}>
      {_code}
    </Prism>
  )
}
