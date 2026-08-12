'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import type { Group } from 'three'

const zones = [
  { id: 'about', label: 'ABOUT', title: 'The thinking layer', position: [-5.2, 1.0, -1.5] as [number, number, number], color: '#70e8ff' },
  { id: 'projects', label: 'PROJECTS', title: 'Systems built', position: [5.2, 1.0, -1.5] as [number, number, number], color: '#b89cff' },
  { id: 'skills', label: 'SKILLS', title: 'The toolkit', position: [-4.4, -1.2, -2.6] as [number, number, number], color: '#9ff08b' },
  { id: 'experience', label: 'EXPERIENCE', title: 'Where I learned', position: [4.4, -1.2, -2.6] as [number, number, number], color: '#f4c779' },
  { id: 'education', label: 'EDUCATION', title: 'Academic foundation', position: [-2.4, 2.8, -3.8] as [number, number, number], color: '#79b9ff' },
  { id: 'contact', label: 'CONTACT', title: 'Start a conversation', position: [2.4, 2.8, -3.8] as [number, number, number], color: '#ff9fbe' },
]

const projects = [
  ['AUTISMART', 'AI / HEALTHCARE', 'FYP-I A+ · FYP-II A- · Deployed & presented', 'https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html', '#70e8ff'],
  ['CLINICOS', 'HEALTHCARE OPERATIONS', 'Clinic workflow and operational systems', 'https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html', '#b89cff'],
  ['SCHOOLIEP', 'EDUCATION', 'Structured IEP records and workflows', 'https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html', '#9ff08b'],
  ['EDUCORE', 'OPEN LEARNING', '400+ curated technical resources', 'https://alishah1029384756.github.io/educore-open-learning-hub/', '#f4c779'],
] as const

function Ship({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useMemo(() => ({ current: null as Group | null }), [])
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.18 })
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.32}>
      <group ref={ref} position={position} rotation={[0, 0, -0.15]}>
        <mesh>
          <coneGeometry args={[0.42, 1.8, 6]} />
          <meshPhysicalMaterial color="#d9f8ff" metalness={0.8} roughness={0.16} clearcoat={1} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.25, 0.42, 0.8, 16]} />
          <meshStandardMaterial color="#14263d" metalness={0.9} roughness={0.2} />
        </mesh>
        {[-0.42, 0.42].map((x) => <mesh key={x} position={[x, -0.05, 0]} rotation={[0, 0, x > 0 ? -0.28 : 0.28]}><boxGeometry args={[0.7, 0.07, 0.18]} /><meshStandardMaterial color="#6ddfff" emissive="#1c7890" emissiveIntensity={2} metalness={0.55} /></mesh>)}
        <pointLight position={[0, -1.0, 0]} color="#70e8ff" intensity={9} distance={4} />
      </group>
    </Float>
  )
}

function Planet({ position, color, size = 1.25, ring = true }: { position: [number, number, number]; color: string; size?: number; ring?: boolean }) {
  return (
    <Float speed={0.35} rotationIntensity={0.08} floatIntensity={0.16}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[size, 40, 24]} />
          <meshPhysicalMaterial color={color} roughness={0.62} metalness={0.08} emissive={color} emissiveIntensity={0.08} />
        </mesh>
        {ring && <mesh rotation={[Math.PI / 2.7, 0.35, 0.2]}><torusGeometry args={[size * 1.55, size * 0.055, 10, 100]} /><meshBasicMaterial color="#d8c6ff" transparent opacity={0.5} /></mesh>}
      </group>
    </Float>
  )
}

function Portal({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const ref = useMemo(() => ({ current: null as Group | null }), [])
  useFrame((state) => { if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.12 })
  return (
    <group ref={ref} position={position}>
      {[1.0, 1.22, 1.44].map((r, i) => <mesh key={r}><torusGeometry args={[r, 0.018 + i * 0.008, 8, 96]} /><meshBasicMaterial color={color} transparent opacity={0.62 - i * 0.13} /></mesh>)}
      <Text position={[0, -1.72, 0]} fontSize={0.13} color={color} anchorX="center" letterSpacing={0.08}>{label}</Text>
    </group>
  )
}

function AsteroidField() {
  const asteroids = useMemo(() => Array.from({ length: 34 }, (_, i) => {
    const a = (i / 34) * Math.PI * 2
    const r = 5.7 + (i % 5) * 0.22
    return { p: [Math.cos(a) * r, Math.sin(a * 3) * 0.38 - 0.8, Math.sin(a) * r - 1.5] as [number, number, number], s: 0.07 + (i % 4) * 0.035 }
  }), [])
  return <group>{asteroids.map((a, i) => <mesh key={i} position={a.p} rotation={[i * 0.7, i * 0.43, i * 0.2]}><icosahedronGeometry args={[a.s, 0]} /><meshStandardMaterial color={i % 3 === 0 ? '#a8b7c8' : '#46576c'} roughness={0.9} /></mesh>)}</group>
}

function ProjectDock({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <group position={[0, -0.3, -1.4]}>
      {projects.map(([name, type, result, link, color], i) => {
        const x = (i - 1.5) * 1.9
        const selected = active === i
        return <group key={name} position={[x, selected ? 0.14 : 0, 0]} scale={selected ? 1.08 : 1} onClick={(e) => { e.stopPropagation(); onSelect(i) }}>
          <mesh><boxGeometry args={[1.62, 0.9, 0.08]} /><meshPhysicalMaterial color="#0b1324" transparent opacity={0.96} metalness={0.5} roughness={0.22} clearcoat={1} /></mesh>
          <mesh position={[0, 0, 0.06]}><planeGeometry args={[1.48, 0.76]} /><meshBasicMaterial color={color} transparent opacity={selected ? 0.12 : 0.045} /></mesh>
          <Text position={[-0.62, 0.22, 0.1]} fontSize={0.085} color="#f5f8ff" anchorX="left">{name}</Text>
          <Text position={[-0.62, 0.04, 0.1]} fontSize={0.043} color={color} anchorX="left">{type}</Text>
          <Text position={[-0.62, -0.18, 0.1]} fontSize={0.037} color="#aebbd0" maxWidth={1.18} anchorX="left">{result}</Text>
          <mesh position={[0.62, 0.28, 0.1]}><sphereGeometry args={[0.028, 12, 12]} /><meshBasicMaterial color={color} /></mesh>
          {selected && <pointLight position={[0, 0, 0.4]} color={color} intensity={4} distance={2.5} />}
        </group>
      })}
      <Text position={[0, -0.74, 0]} fontSize={0.07} color="#6f829c" anchorX="center" letterSpacing={0.07}>PROJECT CONSTELLATION · CLICK TO SELECT</Text>
    </group>
  )
}

function World({ activeProject, setActiveProject, reduced }: { activeProject: number; setActiveProject: (n: number) => void; reduced: boolean }) {
  const world = useMemo(() => ({ current: null as Group | null }), [])
  useFrame((state, delta) => {
    if (!world.current || reduced) return
    world.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.018
    world.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.035
  })
  return <>
    <color attach="background" args={['#030611']} />
    <fog attach="fog" args={['#030611', 8, 22]} />
    <ambientLight intensity={0.2} />
    <hemisphereLight color="#8feaff" groundColor="#060916" intensity={0.45} />
    <pointLight position={[5, 5, 5]} color="#69e8ff" intensity={30} distance={16} />
    <pointLight position={[-5, 1, 2]} color="#a47dff" intensity={24} distance={14} />
    <pointLight position={[0, -4, 3]} color="#ffbd73" intensity={14} distance={11} />
    <group ref={world}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#050d1b" metalness={0.72} roughness={0.46} /></mesh>
      <gridHelper args={[20, 40, '#174b61', '#0a1d30']} position={[0, -2.18, 0]} />
      <mesh position={[0, 0.4, -5.5]}><planeGeometry args={[15, 8]} /><meshBasicMaterial color="#081225" transparent opacity={0.68} /></mesh>
      <mesh position={[0, 0.5, -4.8]}><boxGeometry args={[11, 6.5, 0.05]} /><meshBasicMaterial color="#21405a" transparent opacity={0.13} wireframe /></mesh>

      <Float speed={0.55} rotationIntensity={0.12} floatIntensity={0.22}>
        <group position={[0, 0.45, 0]}>
          <mesh><icosahedronGeometry args={[0.9, 3]} /><meshStandardMaterial color="#071a2d" emissive="#2bdcff" emissiveIntensity={1.05} metalness={0.7} roughness={0.2} wireframe /></mesh>
          <mesh scale={[0.58, 1.05, 0.58]}><sphereGeometry args={[0.7, 32, 20]} /><meshPhysicalMaterial color="#101a31" emissive="#3b216f" emissiveIntensity={0.6} transparent opacity={0.9} metalness={0.55} roughness={0.17} clearcoat={1} /></mesh>
          {[1.3, 1.72, 2.14].map((r, i) => <mesh key={r} rotation={[0.4 + i * 0.3, 0.2 + i * 0.5, i * 0.25]}><torusGeometry args={[r, 0.012, 8, 128]} /><meshBasicMaterial color={i === 1 ? '#b78cff' : '#62ddff'} transparent opacity={0.42 - i * 0.07} /></mesh>)}
          <Text position={[0, -1.42, 0]} fontSize={0.105} color="#72e5ff" anchorX="center" letterSpacing={0.08}>ALI · DIGITAL IDENTITY</Text>
        </group>
      </Float>

      <Ship position={[-3.5, 2.25, -1.5]} />
      <Ship position={[3.65, -0.1, -4.1]} />
      <Planet position={[-6.0, 2.7, -5.2]} color="#234e70" size={0.95} />
      <Planet position={[6.0, 2.9, -6.2]} color="#593b70" size={1.35} />
      <Planet position={[5.8, -1.65, -6.4]} color="#5f492c" size={0.65} ring={false} />
      <Portal position={[-2.35, 2.65, -4.3]} color="#70e8ff" label="EDUCATION" />
      <Portal position={[2.35, 2.65, -4.3]} color="#ff9fbe" label="CONTACT" />
      <AsteroidField />
      <ProjectDock active={activeProject} onSelect={setActiveProject} />
      {zones.map((zone) => <group key={zone.id} position={zone.position}><Text fontSize={0.09} color={zone.color} anchorX="center" letterSpacing={0.09}>{zone.label}</Text><Text position={[0, -0.18, 0]} fontSize={0.055} color="#91a1b7" anchorX="center">{zone.title}</Text></group>)}
      <Sparkles count={reduced ? 45 : 170} scale={14} size={1.05} speed={reduced ? 0 : 0.2} color="#78ddff" />
    </group>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.12} minPolarAngle={Math.PI / 2.9} maxPolarAngle={Math.PI / 1.65} />
  </>
}

export function SpaceProfile() {
  const [entered, setEntered] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [command, setCommand] = useState('')

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const runCommand = (value: string) => {
    const q = value.toLowerCase().trim()
    const index = projects.findIndex(([name]) => q.includes(name.toLowerCase()))
    if (index >= 0) setActiveProject(index)
    const zone = zones.find((item) => q.includes(item.id) || q.includes(item.label.toLowerCase()))
    if (zone) document.querySelector(`#${zone.id}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    setCommand('')
  }

  const current = projects[activeProject]

  return <section id="top" className={`immersive-profile ${entered ? 'is-entered' : 'is-landing'}`} aria-label="Immersive portfolio for Syed Muhammad Ali Naqvi">
    <div className="immersive-vignette" />
    <div className="immersive-topbar"><a href="#top" className="immersive-brand"><span>SA</span><b>SYED MUHAMMAD ALI NAQVI</b></a><span className="immersive-status"><i /> AVAILABLE · 2026</span></div>
    <div className="immersive-canvas"><Canvas camera={{ position: [0, 1.15, 10], fov: 46 }} dpr={[1, 1.5]}><World activeProject={activeProject} setActiveProject={setActiveProject} reduced={reduced} /></Canvas></div>

    {!entered ? <div className="immersive-landing"><div className="immersive-kicker">FULL-STACK DEVELOPER · AI BUILDER · FAST-NUCES GRADUATE</div><h1>Syed Muhammad<br /><em>Ali Naqvi.</em></h1><p>Step into my digital universe — systems, projects, engineering and the work behind them.</p><div className="immersive-actions"><button type="button" onClick={() => setEntered(true)}>ENTER MY UNIVERSE <span>↗</span></button><a href="#about">Skip to portfolio</a></div><small>Drag to orbit · Click a project constellation · Explore the space</small></div> : <>
      <div className="immersive-project-info"><span>PROJECT CONSTELLATION</span><strong>{current[0]}</strong><b>{current[1]}</b><p>{current[2]}</p><a href={current[3]} target="_blank" rel="noopener noreferrer">OPEN PROJECT ↗</a></div>
      <nav className="immersive-nav" aria-label="Portfolio sections">{zones.map((zone) => <a key={zone.id} href={`#${zone.id}`}><span>{zone.label}</span><small>{zone.title}</small></a>)}</nav>
      <form className="immersive-command" onSubmit={(e) => { e.preventDefault(); runCommand(command) }}><span>⌘</span><input aria-label="Navigate portfolio" value={command} onChange={(e) => setCommand(e.target.value)} placeholder="autismart / projects / skills / contact" /></form>
      <button className="immersive-exit" type="button" onClick={() => setEntered(false)}>EXIT UNIVERSE</button><div className="immersive-hint">DRAG TO ORBIT · EXPLORE THE WORLD · CLICK PROJECTS</div>
    </>}
  </section>
}
