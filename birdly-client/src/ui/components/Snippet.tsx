'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CodeEditor } from './CodeEditor'

interface SnippetProps {
  title?: string
  initCode?: string
  onRun?: (code: string) => void
  className?: string
  readOnly?: boolean
}

const Snippet = ({
  title = 'Example',
  initCode = 'x = 5\ny = "John"\nprint(x)\nprint(y)',
  onRun,
  className,
}: SnippetProps) => {
  const [code, setCode] = useState(initCode)

  const handleRunCode = () => {
    if (onRun) {
      onRun(code)
    } else {
      console.log('Code executed:\n', code)
    }
  }

  return (
    <div
      className={cn(
        'w-full max-w-lg overflow-hidden rounded-lg border border-gray-700',
        className,
      )}>
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800 px-4 py-2 text-white">
        {title}
      </div>

      {/* Code area */}
      <div className="bg-[#1e2a31] p-4 text-gray-200">
        <CodeEditor code={code} setCode={setCode} />
      </div>

      {/* Button area */}
      <div className="border-t border-gray-700/30 bg-[#1e2a31] p-2">
        <button
          onClick={handleRunCode}
          className="rounded-md bg-[#8bc34a] px-3 py-1 text-sm font-medium text-black transition-colors hover:bg-[#7cb342]">
          Try it your self &gt;
        </button>
      </div>
    </div>
  )
}

export default Snippet
