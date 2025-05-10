import usePlayground from '@/hooks/usePlayground'
import { CodeEditor } from '../components/CodeEditor'

const Playground = () => {
  const {
    code,
    setCode,
    output,
    feedback,
    containerRef,
    split1,
    split2,
    onMouseDown,
  } = usePlayground()

  return (
    <main
      ref={containerRef}
      className="flex h-screen w-screen flex-col bg-[#1a2b30] p-6">
      <section
        className="flex min-h-25 w-full flex-col overflow-auto rounded-2xl bg-[#273B42]"
        style={{ height: `${split1}%` }}>
        <CodeEditor code={code} setCode={setCode} />
      </section>

      <div
        onMouseDown={onMouseDown('split1')}
        className="h-6 cursor-row-resize"
      />

      <section
        style={{ height: `${split2 - split1}%` }}
        className="flex min-h-25 w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">output:</span>
        <p>{output}</p>
      </section>

      <div
        onMouseDown={onMouseDown('split2')}
        className="h-6 cursor-row-resize"
      />
      <section
        style={{ height: `${100 - split2}%` }}
        className="flex min-h-25 w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
        <span className="font-semibold">birdly feedback:</span>
        <p>{feedback}</p>
      </section>
    </main>
  )
}

export default Playground
