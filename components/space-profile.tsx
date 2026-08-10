'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'

type Project = { id: string; name: string; type: string; detail: string; result: string; link: string; position: [number, number, number] }

const projects: Project[] = [
  { id: 'autismart', name: 'AUTISMART', type: 'AI / HEALTHCARE', detail: 'Multimodal ASD detection, adaptive therapy, and progress reporting.', result: 'FYP-I A+ · FYP-II A- · IEEE-format paper', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html', position: [-2.1, .65, 0] },
  { id: 'clinicos', name: 'CLINICOS', type: 'OPERATIONS', detail: 'Scheduling-to-billing workflow for modern clinics.', result: 'Manual operations shifted to systemized execution.', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html', position: [2.2, .55, .2] },
  { id: 'schooliep', name: 'SCHOOLIEP', type: 'EDUCATION', detail: 'Structured IEP records with role-based access.', result: 'Auditable record lifecycle for school requirements.', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html', position: [-1.4, -1.4, -.25] },
  { id: 'educonnect', name: 'EDUCONNECT', type: 'COMMUNITY', detail: 'Student support, resources, forums, and analytics.', result: 'One access point for academic and community support.', link: 'https://github.com/AliShah1029384756/EduConnect', position: [1.55, -1.35, -.1] },
]
const sections = [['ABOUT', 'The thinking layer', '#about'], ['WORK', 'Systems shipped', '#projects'], ['SKILLS', 'The toolkit', '#skills'], ['EXPERIENCE', 'Where I learned', '#experience'], ['CONTACT', 'Start a conversation', '#contact']]

function Core() {
  const ref = useMemo(() => ({ current: null as Group | null }), [])
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * .18; ref.current.rotation.x = Math.sin(state.clock.elapsedTime * .35) * .08 } })
  return <group ref={ref}><mesh><icosahedronGeometry args={[.72, 2]} /><meshStandardMaterial color="#c9a45b" emissive="#c9a45b" emissiveIntensity={.5} wireframe metalness={.8} roughness={.25} /></mesh><mesh><sphereGeometry args={[.26, 24, 24]} /><meshStandardMaterial color="#f1d38a" emissive="#c9a45b" emissiveIntensity={2.4} /></mesh>{[1, 1.35, 1.7].map((radius, index) => <mesh key={radius} rotation={[Math.PI / (2 + index), .4 + index * .3, 0]}><torusGeometry args={[radius, .009, 8, 96]} /><meshBasicMaterial color="#c9a45b" transparent opacity={.48 - index * .1} /></mesh>)}<Text position={[0, -1.2, 0]} fontSize={.11} color="#c9a45b" anchorX="center" letterSpacing={.08}>AUTISMART / CORE</Text></group>
}
function Node({ project, active, onSelect }: { project: Project; active: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  return <group position={project.position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect() }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}><mesh scale={active || hovered ? 1.32 : 1}><boxGeometry args={[.3, .3, .3]} /><meshStandardMaterial color="#c9a45b" emissive="#c9a45b" emissiveIntensity={active || hovered ? 1.2 : .3} wireframe /></mesh><Text position={[0, .42, 0]} fontSize={.105} color="#f1d38a" anchorX="center">{project.name}</Text></group>
}
function World({ active, onSelect, reduced }: { active: string; onSelect: (id: string) => void; reduced: boolean }) {
  return <><color attach="background" args={['#11182a']} /><ambientLight intensity={.75} /><pointLight position={[3, 3, 4]} intensity={14} color="#c9a45b" /><pointLight position={[-4, -2, 2]} intensity={8} color="#687eac" /><Float speed={.8} floatIntensity={.2}><Core /></Float>{projects.map((project) => <Node key={project.id} project={project} active={active === project.id} onSelect={() => onSelect(project.id)} />)}<Sparkles count={reduced ? 25 : 110} scale={9} size={.8} speed={reduced ? 0 : .18} color="#c9a45b" /><gridHelper args={[10, 18, '#2d3a55', '#1d2740']} position={[0, -2.1, 0]} /><OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={.18} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.7} /></>
}

export function SpaceProfile() {
  const [entered, setEntered] = useState(false); const [active, setActive] = useState('autismart'); const [reduced, setReduced] = useState(false); const [command, setCommand] = useState('')
  const current = projects.find((project) => project.id === active) ?? projects[0]
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update) }, [])
  function runCommand(value: string) { const query = value.toLowerCase().trim(); const project = projects.find((item) => query.includes(item.id)); if (project) setActive(project.id); const section = sections.find((item) => query.includes(item[0].toLowerCase())); if (section) document.querySelector(section[2])?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); setCommand('') }
  return <section className={`space-profile ${entered ? 'is-entered' : 'is-landing'}`} aria-label="Immersive engineering portfolio">
    <div className="space-topbar"><a href="#top" className="space-brand"><span>SA</span><b>SYED MUHAMMAD ALI NAQVI</b></a><span className="space-status"><i /> SYSTEMS OBSERVATORY / 2026</span></div>
    {!entered && <div className="space-landing"><p className="space-kicker">FULL-STACK ENGINEER · FAST-NUCES GRADUATE 2026</p><h1>Build clearly.<br /><em>Think in systems.</em></h1><p>Healthcare, education, and operations — translated into software people can understand.</p><div className="hero-actions"><button className="enter-button" type="button" onClick={() => setEntered(true)}>EXPLORE THE LAB <span>↗</span></button><a className="skip-link" href="#about">SKIP TO PORTFOLIO</a></div><small>Drag to orbit · Select a node · Use the navigation</small></div>}
    <div className="space-canvas" aria-hidden={!entered}><Canvas camera={{ position: [0, .1, 7.2], fov: 42 }} dpr={[1, 1.5]}><World active={active} onSelect={setActive} reduced={reduced} /></Canvas></div>
    {entered && <><div className="space-hud"><span className="hud-label">SELECTED SYSTEM</span><strong>{current.name}</strong><small>{current.type} · {current.result}</small><div className="hud-rule" /><span>{current.detail}</span><a href={current.link} target="_blank" rel="noopener noreferrer">OPEN CASE STUDY ↗</a></div><nav className="space-spaces" aria-label="Portfolio sections">{sections.map(([label, detail, href]) => <a key={label} href={href}>{label}<small>{detail}</small></a>)}</nav><form className="space-command" onSubmit={(event) => { event.preventDefault(); runCommand(command) }}><span>›</span><input aria-label="Navigate portfolio" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type: projects / autismart / contact" /></form><button className="exit-button" type="button" onClick={() => setEntered(false)}>Exit lab</button></>}
  </section>
}
