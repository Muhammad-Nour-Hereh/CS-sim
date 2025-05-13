import useHomePage from '@/hooks/useHomePage'
import Sidebar from '../components/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { Circle } from '../components/Circle'

export const HomePage = () => {
  const { naivgateQuizHandle } = useHomePage()

  const pathRef = useRef<SVGPathElement | null>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const nodes = ['A', 'B', 'C', 'D', 'E']

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    const segment = length / (nodes.length + 1)

    const points = nodes.map((_, index) => {
      const point = path.getPointAtLength(segment * (index + 1))
      return { x: point.x, y: point.y }
    })

    setPositions(points)
  }, [])

  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main
        className="flex flex-1 flex-col items-center bg-blue-400"
        // onClick={naivgateQuizHandle}
      >
        <div className="relative h-[600px] w-full bg-blue-400 text-white">
          <h1 className="py-2 text-center">map</h1>

          {/* SVG with path and circles */}
          <svg
            viewBox="0 0 600 600"
            className="absolute top-0 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2">
            <path
              ref={pathRef}
              d="M 300 50 C 250 150, 250 250, 300 350 S 350 500, 300 600"
              stroke="#fff"
              strokeDasharray="10,10"
              fill="none"
            />
          </svg>

          {/* Overlay HTML buttons */}
          {positions.map((pos, idx) => (
            <>
              <Circle
                style={{
                  position: `absolute`,
                  left: `calc(50% + ${pos.x - 300 - 20}px)`,
                  top: `${pos.y - 20}px`,
                  width: '40px',
                  height: '40px',
                  color: '#000',
                  cursor: 'pointer',
                }}
                onClick={() => console.log(`Clicked node ${nodes[idx]}`)}>
                Go
              </Circle>
            </>
          ))}
        </div>
      </main>

      <section className="w-[240px] bg-gray-200">right section</section>
    </div>
  )
}
