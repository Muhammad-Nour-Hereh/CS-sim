import { Navigate, Route, Routes } from "react-router-dom"
import { ROUTES } from "../lib/routes"
import { HomePage } from "./HomePage"
import Components from "./Components"
import UserRoutes from "../protected-routes/UserRoutes"
import DevRoutes from "../protected-routes/DevRoutes"
import GuestRoutes from "../protected-routes/GuestRoutes"

const App = () => {

  return (
    <Routes>

      <GuestRoutes>
        <Route path={ROUTES.LOGIN} element={<h1>login</h1>} />
        <Route path={ROUTES.REGISTER} element={<h1>registration</h1>} />
      </GuestRoutes>

      <UserRoutes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.HOME} replace />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.QUIZ} element={<h1>quiz</h1>} />
        <Route path={ROUTES.PRACTICE} element={<h1>practice</h1>} />
        <Route path={ROUTES.GUIDEBOOKS} element={<h1>guidebooks</h1>} />
        <Route path={ROUTES.CHEATS} element={<h1>cheats</h1>} />
        <Route path={ROUTES.PLAYGROUND} element={<h1>playground</h1>} />
        <Route path={ROUTES.SETTINGS} element={<h1>settings</h1>} />
        <Route path={ROUTES.PROFILE} element={<h1>profile</h1>} />
        <Route path={ROUTES.LOGOUT} element={<h1>logout</h1>} />
      </UserRoutes>

      <DevRoutes>
        <Route path={ROUTES.COMPONENTS} element={<Components />} />
      </DevRoutes>
    </Routes>
  )
}

export default App
