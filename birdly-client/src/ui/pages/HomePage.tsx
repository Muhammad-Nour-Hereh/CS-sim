import useHomePage from '@/hooks/useHomePage'
import Sidebar from '../components/Sidebar'

export const HomePage = () => {
  const { naivgateQuizHandle } = useHomePage()
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main
        className="flex flex-1 flex-col items-center bg-blue-400"
        onClick={naivgateQuizHandle}>
        map
      </main>

      <section className="w-[240px] bg-gray-200">right section</section>
    </div>
  )
}
