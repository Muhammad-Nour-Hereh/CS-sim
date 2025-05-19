import { ROUTES } from '@/routes/routes'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useHomePage = () => {
  const navigate = useNavigate()
  const naivgateQuizHandle = () => {
    navigate(ROUTES.QUIZ)
  }
  const pathRef = useRef<SVGPathElement>(null)
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current
      const totalLength = path.getTotalLength()
      const nodeCount = 5
      const spacing = totalLength / (nodeCount - 1)

      const pts = Array.from({ length: nodeCount }, (_, i) =>
        path.getPointAtLength(i * spacing),
      ).map(({ x, y }) => ({ x, y }))
      setPoints(pts)
    }
  }, [])

  return { naivgateQuizHandle, pathRef, points }
}

export default useHomePage
