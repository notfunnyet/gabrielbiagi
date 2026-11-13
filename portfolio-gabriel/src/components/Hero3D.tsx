import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ExtrudeGeometry, Shape, type Group } from 'three'
import { G_POINTS } from './GMark'

function G() {
  const ref = useRef<Group>(null!)
  const geo = useMemo(() => {
    const s = new Shape()
    G_POINTS.split(' ').map((p) => p.split(',').map(Number)).forEach(([x, y], i) => (i ? s.lineTo(x - 3, 3 - y) : s.moveTo(x - 3, 3 - y)))
    const g = new ExtrudeGeometry(s, { depth: 1.4, bevelEnabled: true, bevelSize: 0.07, bevelThickness: 0.07, bevelSegments: 2 })
    g.translate(0, 0, -0.7)
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  useFrame((st, dt) => {
    const k = Math.min(1, dt * 2.5), r = ref.current
    r.rotation.y += (st.pointer.x * 0.5 + Math.sin(st.clock.elapsedTime * 0.4) * 0.4 - r.rotation.y) * k
    r.rotation.x += (-st.pointer.y * 0.3 - r.rotation.x) * k
  })
  return (
    <group ref={ref}>
      <mesh geometry={geo}><meshStandardMaterial color="#2a2d30" roughness={0.55} metalness={0.45} /></mesh>
      <lineSegments><edgesGeometry args={[geo, 25]} /><lineBasicMaterial color="#F2F3F4" transparent opacity={0.55} /></lineSegments>
    </group>
  )
}

export default function Hero3D() {
  const box = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(true)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting))
    io.observe(box.current!)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={box} className="cv">
      <Canvas dpr={[1, 1.5]} frameloop={vis ? 'always' : 'never'} camera={{ position: [0, 0, 13], fov: 35 }} gl={{ antialias: true, powerPreference: 'low-power' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 6]} intensity={2.2} />
        <directionalLight position={[-6, -2, -4]} intensity={1.4} color="#8EE3F5" />
        <G />
      </Canvas>
    </div>
  )
}
