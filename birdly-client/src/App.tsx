import { Navigate, Route, Routes } from "react-router-dom"
import { ROUTES } from "./lib/routes"
import { HomePage } from "./pages/HomePage"
import UserRoutes from "./protected-routes/UserRoutes"
import DevRoutes from "./protected-routes/DevRoutes"
import GuestRoutes from "./protected-routes/GuestRoutes"
import ComponentsPage from "./pages/ComponentsPage"

const App = () => {

  return (
    <Routes>

      <Route element={<GuestRoutes />}>
        <Route path={ROUTES.LOGIN} element={<h1>login</h1>} />
        <Route path={ROUTES.REGISTER} element={<h1>registration</h1>} />
      </Route>

      <Route element={<UserRoutes />}>
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
      </Route>

      <Route element={<DevRoutes />}>
        <Route path={ROUTES.COMPONENTS} element={<ComponentsPage />} />
      </Route>
    </Routes>
  )
}

export default App
