import { ROUTES } from '@/objects/routes'
import { useNavigate } from 'react-router-dom'

const useHomePage = () => {
  const navigate = useNavigate()
  const naivgateQuizHandle = () => {
    navigate(ROUTES.QUIZ)
  }
  return { naivgateQuizHandle }
}

export default useHomePage
