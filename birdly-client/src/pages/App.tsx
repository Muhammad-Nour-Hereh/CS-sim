import { Navigate, Route, Routes } from "react-router-dom"
import { ROUTES } from "../lib/routes"

const App = () => {

  return (
    <>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.HOME} replace />} />
        <Route path={ROUTES.HOME} element={<h1>home</h1>} />
        <Route path={ROUTES.LOGIN} element={<h1>login</h1>} />
        <Route path={ROUTES.REGISTER} element={<h1>registration</h1>} />
      </Routes>

    </>
  )
}

export default App
