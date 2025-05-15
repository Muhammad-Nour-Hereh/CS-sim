import { MDXProvider } from '@mdx-js/react'
import PythonCheats from '../../assets/python_cheats.mdx'
import Sidebar from '../components/Sidebar'

const CheatsPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex max-w-none flex-1 flex-col p-4">
        <div className="mdx-reset">
          <MDXProvider>
            <PythonCheats />
          </MDXProvider>
        </div>
      </main>
    </div>
  )
}

export default CheatsPage
