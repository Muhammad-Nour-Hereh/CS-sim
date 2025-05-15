import type React from 'react'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Textarea } from '@/components/ui/textarea'

const ChatArea = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')

    // Add user message to the chat
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
  }
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-lg border border-gray-800 bg-gray-950 text-gray-100">
      <div className="border-b border-gray-800 bg-gray-900 p-3">
        <h2 className="text-lg font-medium text-amber-50">AI Assistant</h2>
      </div>

      <div className="flex h-80 flex-col space-y-4 overflow-y-auto bg-gray-900 p-4">
        {messages.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            Ask me anything to get started...
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'max-w-[85%] rounded-lg p-3',
                message.role === 'user'
                  ? 'ml-auto bg-gray-800'
                  : 'border border-gray-800 bg-gray-950',
              )}>
              <div className="flex items-start">
                <div className="text-sm">
                  {message.role === 'user' ? (
                    <span className="font-semibold text-green-400">You</span>
                  ) : (
                    <span className="font-semibold text-blue-400">AI</span>
                  )}
                </div>
              </div>
              <div className="mt-1 text-sm whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="max-w-[85%] rounded-lg border border-gray-800 bg-gray-950 p-3">
            <div className="flex items-start">
              <div className="text-sm">
                <span className="font-semibold text-blue-400">AI</span>
              </div>
            </div>
            <div className="mt-1 text-sm">
              <div className="flex space-x-1">
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                  style={{ animationDelay: '0ms' }}></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                  style={{ animationDelay: '150ms' }}></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                  style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-800 bg-gray-900 p-3">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-10 resize-none border-gray-800 bg-gray-950 text-gray-100 placeholder:text-gray-500 focus-visible:ring-green-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button
            variant="muted"
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-green-600 text-white hover:bg-green-700">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <div className="mt-2 text-right">
          <Button
            type="button"
            variant="link"
            className="p-0 text-xs text-green-500 hover:text-green-400"
            onClick={() => setMessages([])}>
            Clear conversation
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatArea
