import { Navigate, Route, Routes } from 'react-router-dom'
import GuestRoutes from '../protected-routes/GuestRoutes'
import { ROUTES } from '@/routes/routes'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserRoutes from '../protected-routes/UserRoutes'
import { HomePage } from '../pages/HomePage'
import GuildbookPage from '../pages/GuildbookPage'
import CheatsPage from '../pages/CheatsPage'
import Playground from '../pages/Playground'
import QuizPage from '../pages/QuizPage'
import ComponentsPage from '../pages/ComponentsPage'
import DevRoutes from '../protected-routes/DevRoutes'

const AppRoutes = () => {
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
        <Route path={ROUTES.CHEATS} element={<CheatsPage />} />
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

export default AppRoutes
