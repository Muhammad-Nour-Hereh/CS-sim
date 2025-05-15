import { MDXProvider } from '@mdx-js/react'
import MyMdxFile from '../../assets/python_variables.mdx'
import Sidebar from '../components/Sidebar'
import Snippet from '../components/Snippet'
import { Separator } from '@radix-ui/react-separator'
import ChatArea from '../components/ChatArea'

const GuildbookPage = () => {
  return (
    <div className="flex w-screen">
      <aside className="min-h-screen w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex min-h-screen max-w-none flex-1 flex-col p-4 pb-15">
        <div className="mdx-reset">
          <MDXProvider>
            <MyMdxFile
              components={{
                CodeEditor({ initCode }) {
                  return <Snippet initCode={initCode} />
                },
              }}
            />
          </MDXProvider>
        </div>
        <Separator />
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">
            Chat with our AI Assistant
          </h2>
          <ChatArea />
        </div>
      </main>
    </div>
  )
}

export default GuildbookPage
