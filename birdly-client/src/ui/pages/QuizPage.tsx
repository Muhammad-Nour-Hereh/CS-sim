const QuizPage = () => {
    return (
        <div className="h-screen w-screen flex flex-col bg-[#0d1117] text-white p-4 ">
            {/* Top: Progress Bar */}
            <header className="h-12 flex items-center justify-between  bg-gray-400">
                header
            </header>

            {/* Middle: Question and Answers */}
            <main className="flex-1 flex flex-col justify-center items-center space-y-6  bg-gray-900">
                quiz content
            </main>

            {/* Bottom: Buttons */}
            <footer className="h-16 flex justify-between items-center bg-gray-400">
                buttom
            </footer>
        </div>
    )
}


export default QuizPage