import { Route, Routes } from "react-router-dom"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/home" element={<h1>home</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/registration" element={<h1>registration</h1>} />
      </Routes>

    </>
  )
}

export default App
