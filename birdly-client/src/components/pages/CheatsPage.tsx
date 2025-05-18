import { MDXProvider } from '@mdx-js/react'
import PythonCheats from '../../assets/python_cheats.mdx'
import Sidebar from '../ui/Sidebar'
// import React, { useEffect, useState } from 'react'
// import { compile } from '@mdx-js/mdx'
// import { remote } from '@/remotes/remotes'
// import * as runtime from 'react/jsx-runtime'

const CheatsPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex max-w-none flex-1 flex-col p-4 pl-10">
        <div className="mdx-reset">
          <MDXProvider>
            <PythonCheats />
            {/* <MDXRenderer
                url={
                  'http://127.0.0.1:8000/storage/intro-to-birdly/guildbooks/accusantium-et-sit.mdx'
                }
              /> */}
          </MDXProvider>
        </div>
      </main>
    </div>
  )
}

export default CheatsPage

// function MDXRenderer({ url }: any) {
//   const [Content, setContent] = useState(() => () => (
//     <div>Loading MDX content...</div>
//   ))
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchAndRenderMDX() {
//       try {
//         // 1. Fetch the MDX file
//         const response = await remote.fetchFile(url)
//         console.log(response)
//         if (!response.ok) {
//           throw new Error(`Failed to fetch MDX: ${response.statusText}`)
//         }

//         const mdxContent = await response.text()

//         // 2. Compile the MDX to JSX
//         const compiled: any = await compile(mdxContent, {
//           outputFormat: 'function-body',
//           development: false,
//         })

//         // 3. Evaluate the compiled JSX
//         const scope = {
//           ...runtime,
//           Fragment: React.Fragment,
//           useDynamicImport: () => () => Promise.resolve(),
//           useMDXComponents: () => ({}),
//         }

//         const keys = Object.keys(scope)
//         const values = Object.values(scope)
//         const fn = new Function(...keys, compiled.value)
//         const MDXModule = fn(...values)

//         // 4. Set the rendered component to state
//         setContent(() => MDXModule.default)
//       } catch (err: any) {
//         console.error('Error rendering MDX:', err)
//         setError(err.message)
//       }
//     }

//     fetchAndRenderMDX()
//   }, [url])

//   if (error) {
//     return <div>Error loading content: {error}</div>
//   }

//   return (
//     <MDXProvider
//       components={{
//         h1: (props) => <h1 style={{ color: 'blue' }} {...props} />,
//         h2: (props) => <h2 style={{ color: 'green' }} {...props} />,
//         p: (props) => <p style={{ lineHeight: 1.5 }} {...props} />,
//         // Add more component overrides as needed
//       }}>
//       <Content />
//     </MDXProvider>
//   )
// }
