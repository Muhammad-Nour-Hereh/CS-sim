const Playground = () => {
  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-6">
      <section className="flex w-full flex-1 rounded-2xl bg-blue-400 p-4">
        code editor:
      </section>
      <section className="flex w-full flex-1 rounded-2xl bg-blue-400 p-4">
        output:
      </section>
      <section className="flex w-full flex-1 rounded-2xl bg-blue-400 p-4">
        ai output:
      </section>
    </div>
  )
}

export default Playground
