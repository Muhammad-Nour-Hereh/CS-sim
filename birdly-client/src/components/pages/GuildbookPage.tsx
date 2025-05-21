import { MDXProvider } from '@mdx-js/react'
import Sidebar from '../ui/Sidebar'
import Snippet from '../ui/Snippet'
import ChatArea from '../ui/ChatArea'
import { remote } from '@/remotes/remotes'
import { useEffect, useState } from 'react'
import MDXContent from '../../assets/python_variables.mdx'
import { baseURL } from '@/remotes/axios_defaults'

const GuildbookPage = () => {
  const [path, setPath] = useState('')

  useEffect(() => {
    const updatePath = async () => {
      const res = await remote.guildbook.getById(1)
      const _path = baseURL + '/' + res.data?.content
      if (_path) setPath(_path)
    }
    updatePath()
  }, [])

  const components = {
    CodeEditor({ initCode }: any) {
      return <Snippet initCode={initCode} />
    },
  }

  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className="flex w-screen">
      <aside className="min-h-screen w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex min-h-screen max-w-none flex-1 flex-col p-4 pb-15 pl-10">
        <div className="mdx-reset">
          <MDXProvider>
            <MDXContent components={components} />
            {/* {path && (
              <MDXRenderer
                url={
                  'http://127.0.0.1:8000/storage/intro-to-birdly/guildbooks/accusantium-et-sit.mdx'
                }
              />
            )} */}
          </MDXProvider>
        </div>

        <div className="mt-16">
          <ChatArea />
        </div>
      </main>
    </div>
  )
}

export default GuildbookPage