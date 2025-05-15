import { MDXProvider } from '@mdx-js/react'
import MyMdxFile from '../../assets/hello_world.mdx'
import Sidebar from '../components/Sidebar'

const CheatsPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="bg flex flex-1 flex-col p-4">
        <MDXProvider>

        </MDXProvider>
      </main>
    </div>
  )
}

export default CheatsPage
