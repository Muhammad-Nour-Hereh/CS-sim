import usePlayground from '@/hooks/usePlayground'
import { CodeEditor } from '../components/CodeEditor'
import { ArrowLeft, House, Menu, Play, Plus } from 'lucide-react'
import IconButton from '../components/IconButton'
import ListItem from '../components/ListItem'

const Playground = () => {
  const {
    code,
    setCode,
    output,
    feedback,
    snippets,
    containerRef,
    split1,
    split2,
    splitV,
    onMouseDown,
    selectedIndex,
    isSideMenuOpen,
    runHandle,
    menuHandle,
    minmizeMenuHandle,
    navigateHomeHandle,
    snippetSelectHandle,
    ChangeNameHandle,
  } = usePlayground()

  return (
    <div
      ref={containerRef}
      className="flex h-screen w-screen flex-row bg-[#1a2b30] py-6">
      {isSideMenuOpen || (
        <>
          <aside className="flex h-fit w-fit flex-col gap-2 rounded-r-2xl bg-[#273B42] p-2">
            <IconButton className="text-gray-500" onClick={menuHandle}>
              <Menu />
            </IconButton>
            <IconButton className="text-gray-500" onClick={runHandle}>
              <Play />
            </IconButton>
            <IconButton className="text-gray-500" onClick={navigateHomeHandle}>
              <House />
            </IconButton>
          </aside>
          <div className="w-6" />
        </>
      )}

      {isSideMenuOpen && (
        <>
          <aside
            style={{ width: `${splitV}%` }}
            className="flex h-full flex-col gap-2 rounded-r-2xl bg-[#273B42] p-2">
            <IconButton className="text-gray-500" onClick={minmizeMenuHandle}>
              <ArrowLeft />
            </IconButton>
            <div className="bg-selected flex items-center text-gray-500 hover:brightness-140 active:brightness-90">
              <IconButton className="text-gray-500" onClick={minmizeMenuHandle}>
                <Plus />
              </IconButton>
              <span className="font-bold">create new</span>
            </div>

            <ul className="flex flex-col gap-3">
              {snippets.map((snippet: any, index: number) => {
                const isSelected = selectedIndex === index
                return (
                  <ListItem
                    key={index}
                    isSelected={isSelected}
                    onClick={() => snippetSelectHandle(index)}
                    onValueChange={ChangeNameHandle}>
                    {snippet.title}
                  </ListItem>
                )
              })}
            </ul>
          </aside>
          <div
            onMouseDown={onMouseDown('splitV')}
            className="w-6 cursor-col-resize"
          />
        </>
      )}

      <main
        style={{
          width: isSideMenuOpen ? `${100 - splitV}%` : '100%',
        }}
        className="flex w-full flex-col pr-6">
        <section
          className="relative flex w-full flex-col overflow-auto rounded-2xl bg-[#273B42]"
          style={{ height: `${split1}%` }}>
          <div className="flex-1 overflow-auto">
            <CodeEditor code={code} setCode={setCode} />
          </div>
          <div className="sticky bottom-0 left-0 flex h-6 w-full items-center bg-[#1f2f34] px-8">
            footer
          </div>
        </section>

        <div
          onMouseDown={onMouseDown('split1')}
          className="h-6 cursor-row-resize"
        />

        <section
          style={{ height: `${split2 - split1}%` }}
          className="flex min-h-25 w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
          <span className="font-semibold">output:</span>
          <p>{output}</p>
        </section>

        <div
          onMouseDown={onMouseDown('split2')}
          className="h-6 cursor-row-resize"
        />
        <section
          style={{ height: `${100 - split2}%` }}
          className="flex min-h-25 w-full flex-col overflow-auto rounded-2xl bg-[#273B42] p-4">
          <span className="font-semibold">birdly feedback:</span>
          <p>{feedback}</p>
        </section>
      </main>
    </div>
  )
}

export default Playground
