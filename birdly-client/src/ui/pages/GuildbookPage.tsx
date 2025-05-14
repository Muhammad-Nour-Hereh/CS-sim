import { MDXProvider } from '@mdx-js/react'
import MyMdxFile from '../../assets/hello_world.mdx'

const GuildbookPage = () => {
  return (
    <MDXProvider>
      <MyMdxFile />
    </MDXProvider>
  )
}

export default GuildbookPage
