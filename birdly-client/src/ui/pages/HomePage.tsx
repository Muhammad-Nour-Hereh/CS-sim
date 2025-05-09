import Sidebar from "../components/Sidebar"


export const HomePage = () => {
    return (
        <div className="flex w-screen h-screen">
            <aside className="w-56 bg-gray-900 text-white">
                <Sidebar />
            </aside>

            <main className="flex-1 flex flex-col items-center bg-blue-400">
                map
            </main>

            <section className="w-[240px] bg-gray-200">
                right section
            </section>
        </div>
    )
}
