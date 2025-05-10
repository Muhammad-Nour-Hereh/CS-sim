import { useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { EditorView } from 'codemirror'

export const duolingoDarkTheme = EditorView.theme({
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
    border: 'none',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  '.cm-activeLine': {
    // backgroundColor: '#37415144', // subtle active line
  },
})

const Playground = () => {
  const code =
    'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
  const [output, SetOutput] = useState('hello, world!')
  const [feedback, SetFeedback] = useState('your code is awesome')

  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-6">
      <section className="flex w-full flex-4 flex-col overflow-hidden rounded-2xl bg-[#273B42]">

          <CodeMirror
            value={code}
            height="100%"
            width="100%"
            extensions={[python(), duolingoDarkTheme]}
            //   onChange={(value) => onChange(value)}
            theme={duolingoDarkTheme}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              autocompletion: false
            }}
          />

      </section>
      <section className="flex w-full flex-1 flex-col rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">output:</span>
        <p>{output}</p>
      </section>
      <section className="flex w-full flex-1 flex-col rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">birdly feedback:</span>
        <p>{feedback}</p>
      </section>
    </div>
  )
}

export default Playground
