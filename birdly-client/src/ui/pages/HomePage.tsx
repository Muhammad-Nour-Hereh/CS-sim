import useHomePage from '@/hooks/useHomePage'
import Sidebar from '../components/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { Circle } from '../components/Circle'

const MAP_WIDTH = 800 // Can be any size
const MAP_HEIGHT = 1500
const CIRCLE_SIZE = 64

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

    const length = path.getTotalLength()
    const segment = length / (nodes.length + 1)

    const points = nodes.map((_, index) => {
      const p = path.getPointAtLength(segment * (index + 1))
      return { x: p.x, y: p.y }
    })

    setPositions(points)
  }, [])

  return (
    <div className="flex h-screen w-screen">
      <aside className="w-56 bg-gray-900 text-white">
        <Sidebar />
      </aside>

      <main className="flex flex-1 flex-col items-center overflow-hidden bg">
        <h1 className="bg-primary m-10 rounded-full p-10 px-30 py-2 text-center text-4xl font-bold">
          Section 1
        </h1>
        <div
          className={`relative h-fit w-full max-w-[90vmin]`}
          style={{
            aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}`,
          }}>
          {/* SVG */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute top-0 left-0 z-0 h-full w-full">
            <path
              ref={pathRef}
              d="M 400 50 C 300 150, 300 250, 400 350 S 500 500, 400 600"
              stroke="#fff"
              strokeDasharray="10,10"
              fill="none"
            />
          </svg>
          {/* Circles */}
          {positions.map((pos, idx) => (
            <Circle
              key={idx}
              style={{
                position: 'absolute',
                left: `calc(${(pos.x / MAP_WIDTH) * 100}% - ${CIRCLE_SIZE / 2}px)`,
                top: `calc(${(pos.y / MAP_HEIGHT) * 100}% - ${CIRCLE_SIZE / 2}px)`,
                width: `${CIRCLE_SIZE}px`,
                height: `${CIRCLE_SIZE}px`,
              }}
              onClick={naivgateQuizHandle}>
              {nodes[idx]}
            </Circle>
          ))}
        </div>
      </main>

      {/* <section className="w-[240px] bg-gray-200">right section</section> */}
    </div>
  )
}
