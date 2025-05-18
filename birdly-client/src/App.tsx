import { BrowserRouter } from 'react-router-dom'
import Contexts from './contexts/Contexts'
import AppRoutes from './ui/components/AppRoutes'

const App = () => {
  console.log(import.meta.env.VITE_TEST)
  return (
    <Contexts>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Contexts>
  )
}

export default App
