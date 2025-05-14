import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './objects/routes'
import { HomePage } from './ui/pages/HomePage'
import UserRoutes from './protected-routes/UserRoutes'
import DevRoutes from './protected-routes/DevRoutes'
import GuestRoutes from './protected-routes/GuestRoutes'
import ComponentsPage from './ui/pages/ComponentsPage'
import QuizPage from './ui/pages/QuizPage'
import Playground from './ui/pages/Playground'
import LoginPage from './ui/pages/LoginPage'
import RegisterPage from './ui/pages/RegisterPage'
import GuildbookPage from './ui/pages/GuildbookPage'

const App = () => {
  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTES.FORGETPASSWORD}
          element={
            <h1 className="flex items-center justify-center p-50 text-3xl font-extrabold">
              don't forget it next time 🙃
            </h1>
          }
        />
      </Route>

      <Route element={<UserRoutes />}>
        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.HOME} replace />}
        />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.QUIZ} element={<QuizPage />} />
        <Route path={ROUTES.PRACTICE} element={<h1>practice</h1>} />
        <Route path={ROUTES.GUIDEBOOKS} element={<GuildbookPage />} />
        <Route path={ROUTES.CHEATS} element={<h1>cheats</h1>} />
        <Route path={ROUTES.PLAYGROUND} element={<Playground />} />
        <Route path={ROUTES.SETTINGS} element={<h1>settings</h1>} />
        <Route path={ROUTES.PROFILE} element={<h1>profile</h1>} />
      </Route>

      <Route element={<DevRoutes />}>
        <Route path={ROUTES.COMPONENTS} element={<ComponentsPage />} />
      </Route>
    </Routes>
  )
}

export default App
