export const HomePage = () => {
    return (
        <div className="flex w-screen h-screen">
        <aside className="w-[240px] bg-gray-800 text-white">
          sidebar
        </aside>
  
        <main className="flex-1 flex flex-col items-center bg-white">
          map
        </main>
  
        <section className="w-[240px] bg-gray-200">
          right section
        </section>
      </div>
    )
}
