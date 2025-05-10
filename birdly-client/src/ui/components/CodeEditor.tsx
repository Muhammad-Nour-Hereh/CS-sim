import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { EditorView } from 'codemirror'

export const myTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    color: '#e0f2f1',
    borderRadius: '12px',
    padding: '8px',
  },
  '.cm-scroller': {
    fontFamily: 'nunito, monospace',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1.6',
    overflow: 'auto',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent !important',
    color: '#8ca0a0',
    // border: 'green 4px solid',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  '.cm-activeLine': {
    // backgroundColor: '#37415144', // subtle active line
  },
})

interface CodeEditorProps {
  code: string
  setCode: Function
  language?: string
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <CodeMirror
      value={code}
      height="100%"
      width="100%"
      extensions={[python(), myTheme]}
      onChange={(value) => setCode(value)}
      theme={myTheme}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        autocompletion: false,
      }}
    />
  )
}
