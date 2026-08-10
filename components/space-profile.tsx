'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useEffect, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'

const projects = [
  { id: 'autismart', name: 'AUTISMART', type: 'AI / HEALTHCARE', detail: 'Multimodal ASD detection, adaptive therapy, and progress reporting.', result: 'FYP-I A+ · FYP-II A- · IEEE-format paper', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html', position: [-2.2, 0.45, 0] as [number, number, number] },
  { id: 'clinicos', name: 'CLINICOS', type: 'OPERATIONS', detail: 'Scheduling-to-billing workflow for modern clinics.', result: 'Manual operations shifted to systemized execution.', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html', position: [2.2, 0.35, 0.4] as [number, number, number] },
  { id: 'schooliep', name: 'SCHOOLIEP', type: 'EDUCATION', detail: 'Structured IEP records with role-based access.', result: 'Auditable record lifecycle for school requirements.', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html', position: [-1.3, -1.25, -0.4] as [number, number, number] },
  { id: 'educonnect', name: 'EDUCONNECT', type: 'COMMUNITY', detail: 'Student support, resources, forums, and analytics.', result: 'One access point for academic and community support.', link: 'https://github.com/AliShah1029384756/EduConnect', position: [1.45, -1.2, -0.2] as [number, number, number] },
]

const spaces = [['ABOUT', 'Systems thinker before coder', '#about'], ['WORK', 'Four systems, real problems', '#projects'], ['SKILLS', 'Strong fundamentals, deeper next', '#skills'], ['EXPERIENCE', 'Atlas Honda · Al Bethat', '#experience'], ['CONTACT', 'Open to meaningful work', '#contact']]

function Core({ reduced }: { reduced: boolean }) {
  useFrame((state) => { if (!reduced) state.camera.lookAt(0, 0, 0) })
  return <group><mesh rotation={[0.4, 0.7, 0.1]}><icosahedronGeometry args={[0.72, 2]} /><meshStandardMaterial color="#c9a45b" emissive="#c9a45b" emissiveIntensity={0.5} wireframe metalness={0.8} roughness={0.25} /></mesh><mesh><sphereGeometry args={[0.28, 24, 24]} /><meshStandardMaterial color="#f1d38a" emissive="#c9a45b" emissiveIntensity={2.4} /></mesh>{[0.95, 1.3, 1.75].map((radius, index) => <mesh key={radius} rotation={[Math.PI / (2 + index), 0.4 + index * 0.3, 0]}><torusGeometry args={[radius, 0.008, 8, 96]} /><meshBasicMaterial color="#c9a45b" transparent opacity={0.5 - index * 0.1} /></mesh>)}<Text position={[0, -1.2, 0]} fontSize={0.12} color="#c9a45b" anchorX="center" letterSpacing={0.08}>AUTISMART / CORE</Text></group>
}

function ProjectNode({ project, active, onSelect }: { project: typeof projects[number]; active: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  return <group position={project.position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect() }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}><mesh scale={active || hovered ? 1.25 : 1}><boxGeometry args={[0.28, 0.28, 0.28]} /><meshStandardMaterial color="#c9a45b" emissive="#c9a45b" emissiveIntensity={active || hovered ? 1.1 : 0.3} wireframe /></mesh><Text position={[0, 0.42, 0]} fontSize={0.105} color="#f1d38a" anchorX="center">{project.name}</Text></group>
}

function World({ active, setActive, reduced }: { active: string; setActive: (value: string) => void; reduced: boolean }) {
  return <><color attach="background" args={['#11182a']} /><ambientLight intensity={0.8} /><pointLight position={[3, 3, 4]} intensity={15} color="#c9a45b" /><pointLight position={[-4, -2, 2]} intensity={8} color="#788cb6" /><Float speed={0.8} floatIntensity={0.25}><Core reduced={reduced} /></Float>{projects.map((project) => <ProjectNode key={project.id} project={project} active={active === project.id} onSelect={() => setActive(project.id)} />)}<Sparkles count={reduced ? 25 : 100} scale={9} size={0.8} speed={reduced ? 0 : 0.18} color="#c9a45b" /><gridHelper args={[10, 18, '#2d3a55', '#1d2740']} position={[0, -2.1, 0]}/><OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.22} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.7} /></>
}

export function SpaceProfile() {
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState('autismart')
  const [reduced, setReduced] = useState(false)
  const [command, setCommand] = useState('')
  const current = projects.find((project) => project.id === active) ?? projects[0]
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update) }, [])
  function runCommand(value: string) { const query = value.toLowerCase().trim(); if (query.includes('autismart')) setActive('autismart'); else if (query.includes('clinic')) setActive('clinicos'); else if (query.includes('school')) setActive('schooliep'); else if (query.includes('edu')) setActive('educonnect'); else { const target = spaces.find((space) => query.includes(space[0].toLowerCase())); if (target) document.querySelector(target[2])?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }) } setCommand('') }
  return <section className={`space-profile ${entered ? 'is-entered' : 'is-landing'}`} aria-label="Immersive engineering portfolio"><div className="space-topbar"><a href="#top" className="space-brand"><span>SA</span><b>SYED MUHAMMAD ALI NAQVI</b></a><span className="space-status"><i /> SYSTEMS LAB / 2026</span></div>{!entered && <div className="space-landing"><p className="space-kicker">FULL-STACK ENGINEER · FAST-NUCES GRADUATE 2026</p><h1>Build clearly.<br /><em>Think in systems.</em></h1><p>Healthcare, education, and operations — translated into software people can understand.</p><button className="enter-button" type="button" onClick={() => setEntered(true)}>ENTER THE LAB <span>↗</span></button><small>Drag to explore · Select a node to inspect a system</small></div>}<div className="space-canvas" aria-hidden={!entered}><Canvas camera={{ position: [0, 0.1, 7.2], fov: 42 }} dpr={[1, 1.5]}><World active={active} setActive={setActive} reduced={reduced} /></Canvas></div>{entered && <><div className="space-hud"><span className="hud-label">CURRENT SYSTEM</span><strong>{current.name}</strong><small>{current.type} · {current.result}</small><div className="hud-rule" /><span>{current.detail}</span><a href={current.link} target="_blank" rel="noopener noreferrer">OPEN CASE STUDY ↗</a></div><div className="space-spaces" aria-label="Portfolio sections">{spaces.map(([label, detail, href]) => <a key={label} href={href}>{label}<small>{detail}</small></a>)}</div><form className="space-command" onSubmit={(event) => { event.preventDefault(); runCommand(command) }}><span>›</span><input aria-label="Navigate portfolio" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type: projects / autismart / contact" /></form><button className="exit-button" type="button" onClick={() => setEntered(false)}>Exit lab</button></>}</section>
}
