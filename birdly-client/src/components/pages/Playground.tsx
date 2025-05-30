import usePlayground from '@/components/hooks/usePlayground'
import { CodeEditor } from '../ui/CodeEditor'
import {
  ArrowLeft,
  Bot,
  BotOff,
  House,
  Menu,
  Play,
  Plus,
  Save,
} from 'lucide-react'
import IconButton from '../ui/IconButton'
import ListItem from '../ui/ListItem'
import LoadingPage from './LoadingPage'
import { useSnippet } from '@/components/contexts/SnippetContext'

const Playground = () => {
  const {
    code,
    setCode,
    output,
    feedback,
    chatbotOn,
    saveStatus,
    runStatus,
    feedbackStatus,
    containerRef,
    split1,
    split2,
    splitV,
    onMouseDown,
    selectedIndex,
    isSideMenuOpen,
    runHandle,
    menuHandle,
    minimizeMenuHandle,
    navigateHomeHandle,
    snippetSelectHandle,
    ChangeNameHandle,
    saveHandle,
    createSnippetHandle,
    deleteSnippetHandle,
    toggleChatbotHandle,
  } = usePlayground()

  const { initialLoading, snippets } = useSnippet()

  return initialLoading ? (
    <LoadingPage />
  ) : (
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
            <IconButton className="text-gray-500" onClick={saveHandle}>
              <Save />
            </IconButton>
            <IconButton className="text-gray-500" onClick={navigateHomeHandle}>
              <House />
            </IconButton>
            <IconButton className="text-gray-500" onClick={toggleChatbotHandle}>
              {chatbotOn ? <Bot /> : <BotOff />}
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
            <IconButton className="text-gray-500" onClick={minimizeMenuHandle}>
              <ArrowLeft />
            </IconButton>

            <div
              className="bg-selected flex items-center text-gray-500 hover:brightness-140 active:brightness-90"
              onClick={createSnippetHandle}>
              <IconButton
                className="text-gray-500"
                onClick={minimizeMenuHandle}>
                <Plus />
              </IconButton>
              <span className="font-bold">create new</span>
            </div>

            <ul className="flex flex-1 flex-col gap-3 overflow-y-auto">
              {snippets.length === 0 ? (
                <span className="text-gray-400">No snippets yet</span>
              ) : (
                snippets.map((snippet, index: number) => {
                  const isSelected = selectedIndex === index
                  return (
                    <ListItem
                      key={index}
                      isSelected={isSelected}
                      onClick={() => snippetSelectHandle(index)}
                      onValueChange={ChangeNameHandle}
                      onDelete={() => deleteSnippetHandle(snippet.id)}>
                      {snippet.title}
                    </ListItem>
                  )
                })
              )}
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
          <div className="sticky bottom-0 left-0 flex h-6 w-full flex-row-reverse items-center bg-[#1f2f34] px-8">
            <span className="min-w-[80px] text-right text-gray-500">
              {saveStatus}
            </span>

            <div className="mx-2 h-4 w-0.5 bg-gray-600" />
            <span className="min-w-[80px] text-right text-gray-500">
              {feedbackStatus}
            </span>

            <div className="mx-2 h-4 w-0.5 bg-gray-600" />
            <span className="min-w-[80px] text-right text-gray-500">
              {runStatus}
            </span>
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
