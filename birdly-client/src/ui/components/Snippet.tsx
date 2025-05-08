"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SnippetProps {
  title?: string
  defaultCode?: string
  onRun?: (code: string) => void
  className?: string
  readOnly?: boolean
}

const Snippet = ({
  title = "Example",
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
      console.log("Code executed:", code)
      alert("Code execution is simulated. Check the console for details.")
    }
  }

  return (
    <div className={cn("rounded-lg border border-gray-700 overflow-hidden w-full max-w-lg", className)}>
      {/* Header */}
      <div className="px-4 py-2 bg-gray-800 text-white border-b border-gray-700">{title}</div>

      {/* Code area */}
      <div className="bg-[#1e2a31] text-gray-200 p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-transparent border-none outline-none font-mono text-sm resize-none min-h-[100px]"
          spellCheck="false"
          readOnly={readOnly}
        />
      </div>

      {/* Button area */}
      <div className="bg-[#1e2a31] p-2 border-t border-gray-700/30">
        <button
          onClick={handleRunCode}
          className="bg-[#8bc34a] hover:bg-[#7cb342] text-black font-medium py-1 px-3 rounded-md text-sm transition-colors"
        >
          Try it your self &gt;
        </button>
      </div>
    </div>
  )
}

export default Snippet