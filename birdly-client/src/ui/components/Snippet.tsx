'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SnippetProps {
  title?: string
  defaultCode?: string
  onRun?: (code: string) => void
  className?: string
  readOnly?: boolean
}

const Snippet = ({
  title = 'Example',
  defaultCode = 'x = 5\ny = "John"\nprint(x)\nprint(y)',
  onRun,
  className,
  readOnly = false,
}: SnippetProps) => {
  const [code, setCode] = useState(defaultCode)

  const handleRunCode = () => {
    if (onRun) {
      onRun(code)
    } else {
      console.log('Code executed:', code)
      alert('Code execution is simulated. Check the console for details.')
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
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[100px] w-full resize-none border-none bg-transparent font-mono text-sm outline-none"
          spellCheck="false"
          readOnly={readOnly}
        />
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
