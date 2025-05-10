import { useState } from 'react'
import { CodeEditor } from '../components/CodeEditor'

const Playground = () => {
  const code = 'print("hello, world!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
  const [output, SetOutput] = useState('hello, world!')
  const [feedback, SetFeedback] = useState('your code is awesome')

  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-6">
      <section className="flex w-full flex-2 flex-col overflow-hidden rounded-2xl bg-[#273B42] p-4">
        <CodeEditor code={code} />
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
