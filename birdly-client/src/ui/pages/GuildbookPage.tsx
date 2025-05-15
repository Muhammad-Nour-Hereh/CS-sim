import { MDXProvider } from '@mdx-js/react'
import MyMdxFile from '../../assets/python_variables.mdx'
import Sidebar from '../components/Sidebar'
import { CodeEditor } from '../components/CodeEditor'
import { useEffect, useState } from 'react'

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
                CodeEditor() {
                  const [code, setCode] = useState('')
                  useEffect(() => {
                    console.log(code)
                  }, [code])
                  return <CodeEditor code={code} setCode={setCode} />
                },
              }}
            />
          </MDXProvider>
        </div>
      </main>
    </div>
  )
}

export default GuildbookPage
