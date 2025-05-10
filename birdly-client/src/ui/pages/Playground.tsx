import { useState } from 'react'

const Playground = () => {
  const [code, SetCode] = useState('code editor:')
  const [output, SetOutput] = useState('output:')
  const [feedback, SetFeedback] = useState('feedback:')

  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-6">
      <section className="flex w-full flex-1 flex-col rounded-2xl bg-[#273B42] p-4">
        <p>{code}</p>
      </section>
      <section className="flex w-full flex-1 flex-col rounded-2xl bg-[#273B42] p-4">
        <span>output:</span>
        <p>{output}</p>
      </section>
      <section className="flex w-full flex-1 flex-col rounded-2xl bg-[#273B42] p-4">
        <span>birdly feedback:</span>
        <p>{feedback}</p>
      </section>
    </div>
  )
}

export default Playground
