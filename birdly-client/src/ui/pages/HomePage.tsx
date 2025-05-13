import useHomePage from '@/hooks/useHomePage'
import Sidebar from '../components/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { Circle } from '../components/Circle'

const MAP_WIDTH = 1000
const MAP_HEIGHT = 1000
const CIRCLE_SIZE = 40

export const HomePage = () => {
  const { naivgateQuizHandle } = useHomePage()

  const pathRef = useRef<SVGPathElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const nodes = ['A', 'B', 'C', 'D', 'E']

  useEffect(() => {
    const path = pathRef.current
    const svg = svgRef.current
    if (!path || !svg) return

    const bbox = svg.getBoundingClientRect()

    const length = path.getTotalLength()
    const segment = length / (nodes.length + 1)

    const points = nodes.map((_, index) => {
      const point = path.getPointAtLength(segment * (index + 1))
      return {
        x: (point.x / MAP_WIDTH) * bbox.width,
        y: (point.y / MAP_HEIGHT) * bbox.height,
      }
    })

    setPositions(points)
  }, [])

  const offset = CIRCLE_SIZE / 2

  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex flex-1 flex-col items-center bg-blue-400">
        <div className="relative w-full aspect-square max-w-[90vmin]">
          <h1 className="py-2 text-center">map</h1>

          {/* SVG */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute top-0 left-0 h-full w-full z-0"
          >
            <path
              ref={pathRef}
              d="M 300 50 C 250 150, 250 250, 300 350 S 350 500, 300 600"
              stroke="#fff"
              strokeDasharray="10,10"
              fill="none"
            />
          </svg>

          {/* Overlay buttons */}
          {positions.map((pos, idx) => (
            <Circle
              key={idx}
              style={{
                position: 'absolute',
                left: `${pos.x - offset}px`,
                top: `${pos.y - offset}px`,
                width: `${CIRCLE_SIZE}px`,
                height: `${CIRCLE_SIZE}px`,
              }}
              onClick={() => console.log(`Clicked node ${nodes[idx]}`)}
            >
              {nodes[idx]}
            </Circle>
          ))}
        </div>
      </main>

      <section className="w-[240px] bg-gray-200">right section</section>
    </div>
  )
}