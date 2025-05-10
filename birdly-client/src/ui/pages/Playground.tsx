import { useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

const Playground = () => {
  const code =
    'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
  const [output, SetOutput] = useState('hello, world!')
  const [feedback, SetFeedback] = useState('your code is awesome')

  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-6">
      <section className="flex w-full flex-2 flex-col overflow-hidden rounded-2xl bg-[#273B42] p-4">
        <CodeMirror
          value="const hello = 'world';"
          height="200px"
          extensions={[python()]}
          onChange={(value) => console.log(value)}
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
