import { MDXProvider } from '@mdx-js/react'
import MyMdxFile from '../../assets/python_variables.mdx'
import Sidebar from '../components/Sidebar'
import Snippet from '../components/Snippet'
import { Separator } from '@radix-ui/react-separator'
import ChatArea from '../components/ChatArea'


const GuildbookPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex max-w-none flex-1 flex-col p-4">
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
          <h2 className="text-2xl font-bold mb-6">Chat with our AI Assistant</h2>
          <ChatArea />
        </div>
      </main>
    </div>
  )
}

export default GuildbookPage
