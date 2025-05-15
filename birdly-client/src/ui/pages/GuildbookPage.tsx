import { MDXProvider } from '@mdx-js/react'
import MyMdxFile from '../../assets/hello_world.mdx'
import Sidebar from '../components/Sidebar'
import { Button } from '../components/Button'

const GuildbookPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex max-w-none flex-1 flex-col p-4">
        <div className="mdx-reset">
          <MDXProvider
            components={{
              Button,
            }}>
            <MyMdxFile
              components={{
                Planet() {
                  return <span style={{ color: 'tomato' }}>Pluto</span>
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
