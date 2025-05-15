import { MDXProvider } from '@mdx-js/react'
import Sidebar from '../components/Sidebar'
import Snippet from '../components/Snippet'
import { Separator } from '@radix-ui/react-separator'
import ChatArea from '../components/ChatArea'
import { remote } from '@/remotes/remotes'
import { useEffect, useState } from 'react'
import MDXContent from '../../assets/python_variables.mdx'
import { compile } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import React from 'react'
import { baseURL } from '@/remotes/axios_defaults'

const GuildbookPage = () => {
  const [path, setPath] = useState('')

  useEffect(() => {
    const updatePath = async () => {
      const res = await remote.guildbook.getById(1)
      const _path = baseURL + '/' + res.data?.path
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

      <main className="flex min-h-screen max-w-none flex-1 flex-col p-4 pb-15">
        <div className="mdx-reset">
          <MDXProvider>
            {/* <MDXContent components={components}/> */}
            {path && (
              <MDXRenderer
                url={
                  'http://127.0.0.1:8000/storage/intro-to-birdly/guildbooks/accusantium-et-sit.mdx'
                }
              />
            )}
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

function MDXRenderer({ url }: any) {
  const [Content, setContent] = useState(() => () => (
    <div>Loading MDX content...</div>
  ))
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAndRenderMDX() {
      try {
        // 1. Fetch the MDX file
        // const response = await remote.fetchFile(url)
        // console.log(response)
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch MDX: ${response.statusText}`)
        // }

        // const mdxContent = await response.text()
        const mdxContent = '# hello'

        // 2. Compile the MDX to JSX
        const compiled: any = await compile(mdxContent, {
          outputFormat: 'function-body',
          development: false,
        })

        // 3. Evaluate the compiled JSX
        const scope = {
          ...runtime,
          Fragment: React.Fragment,
          useDynamicImport: () => () => Promise.resolve(),
          useMDXComponents: () => ({}),
        }

        const keys = Object.keys(scope)
        const values = Object.values(scope)
        const fn = new Function(...keys, compiled.value)
        const MDXModule = fn(...values)

        // 4. Set the rendered component to state
        setContent(() => MDXModule.default)
      } catch (err: any) {
        console.error('Error rendering MDX:', err)
        setError(err.message)
      }
    }

    fetchAndRenderMDX()
  }, [url])

  if (error) {
    return <div>Error loading content: {error}</div>
  }

  return (
    <MDXProvider
      components={{
        h1: (props) => <h1 style={{ color: 'blue' }} {...props} />,
        h2: (props) => <h2 style={{ color: 'green' }} {...props} />,
        p: (props) => <p style={{ lineHeight: 1.5 }} {...props} />,
        // Add more component overrides as needed
      }}>
      <Content />
    </MDXProvider>
  )
}
