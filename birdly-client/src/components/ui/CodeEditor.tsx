import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { EditorView } from 'codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'

export const myTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    // borderRadius: '12px',
    paddingTop: '8px',
  },
  '.cm-scroller': {
    fontFamily: 'nunito, monospace',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1.6',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent !important',
    borderRight: 'green 4px solid !important',
  },
  '&.cm-editor.cm-focused': {
    outline: 'none',
  },
})

interface CodeEditorProps {
  code: string
  setCode: Function
  initCode?: string
  language?: string
}

export function CodeEditor({ code, setCode, initCode }: CodeEditorProps) {
  if (initCode) setCode(initCode)
  return (
    <CodeMirror
      value={code}
      minHeight="100%"
      width="100%"
      extensions={[python(), myTheme]}
      onChange={(value) => setCode(value)}
      theme={dracula}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        autocompletion: false,
      }}
    />
  )
}
