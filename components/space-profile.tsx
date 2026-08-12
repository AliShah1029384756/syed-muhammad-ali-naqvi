'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'

type Project = { id: string; name: string; type: string; detail: string; result: string; link: string; position: [number, number, number]; color: string }
const projects: Project[] = [
  { id: 'autismart', name: 'AUTISMART', type: 'AI / HEALTHCARE', detail: 'Team-based Final Year Project for autism assessment and care support.', result: 'FYP-I A+ · FYP-II A- · Deployed & presented', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/autismart.html', position: [-2.25, .8, 0], color: '#00f5ff' },
  { id: 'clinicos', name: 'CLINICOS', type: 'HEALTHCARE OPERATIONS', detail: 'Clinic workflow software covering scheduling, records, and operational processes.', result: 'Systemized clinic operations lifecycle', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/clinicos.html', position: [2.25, .65, .2], color: '#ff2bd6' },
  { id: 'schooliep', name: 'SCHOOLIEP', type: 'EDUCATION', detail: 'Structured IEP records and role-aware workflows for school environments.', result: 'Auditable education record lifecycle', link: 'https://alishah1029384756.github.io/AliShah1029384756/projects/schooliep.html', position: [-1.55, -1.45, -.25], color: '#b8ff38' },
  { id: 'educore', name: 'EDUCORE', type: 'OPEN LEARNING', detail: 'Student-first open-learning hub with 400+ curated technical resources.', result: 'Discoverable learning ecosystem', link: 'https://alishah1029384756.github.io/educore-open-learning-hub/', position: [1.65, -1.4, -.1], color: '#9b6cff' },
]
const sections = [['ABOUT', 'The thinking layer', '#about'], ['WORK', 'Systems built', '#projects'], ['SKILLS', 'The toolkit', '#skills'], ['EXPERIENCE', 'Where I learned', '#experience'], ['EDUCATION', 'Academic foundation', '#education'], ['CONTACT', 'Start a conversation', '#contact']]

function Hologram({ reduced }: { reduced: boolean }) {
  const ref = useMemo(() => ({ current: null as Group | null }), [])
  useFrame((state, delta) => { if (ref.current && !reduced) { ref.current.rotation.y += delta * .28; ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .5) * .08 } })
  return <group ref={ref}>
    <mesh><icosahedronGeometry args={[.74, 2]} /><meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.7} wireframe /></mesh>
    <mesh scale={[.45, .72, .4]} position={[0, .02, 0]}><sphereGeometry args={[.45, 16, 16]} /><meshBasicMaterial color="#ff2bd6" transparent opacity={.7} wireframe /></mesh>
    <mesh position={[0, .38, 0]}><sphereGeometry args={[.2, 16, 16]} /><meshBasicMaterial color="#b8ff38" /></mesh>
    {[.95, 1.3, 1.65].map((radius, index) => <mesh key={radius} rotation={[Math.PI / (2 + index), .3 + index * .4, 0]}><torusGeometry args={[radius, .012, 8, 96]} /><meshBasicMaterial color={index % 2 ? '#ff2bd6' : '#00f5ff'} transparent opacity={.55 - index * .1} /></mesh>)}
    <Text position={[0, -1.3, 0]} fontSize={.1} color="#00f5ff" anchorX="center" letterSpacing={.1}>ALI / SYSTEMS CORE</Text>
  </group>
}

function Node({ project, active, onSelect }: { project: Project; active: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  return <group position={project.position} onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect() }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}><mesh scale={active || hovered ? 1.4 : 1}><octahedronGeometry args={[.26, 0]} /><meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={active || hovered ? 2 : .7} wireframe /></mesh><Text position={[0, .45, 0]} fontSize={.1} color={project.color} anchorX="center" letterSpacing={.08}>{project.name}</Text></group>
}

function World({ active, onSelect, reduced }: { active: string; onSelect: (id: string) => void; reduced: boolean }) {
  return <><color attach="background" args={['#05060c']} /><ambientLight intensity={.35} /><pointLight position={[3, 3, 4]} intensity={18} color="#00f5ff" /><pointLight position={[-4, -2, 2]} intensity={13} color="#ff2bd6" /><Float speed={.8} floatIntensity={.25}><Hologram reduced={reduced} /></Float>{projects.map((project) => <Node key={project.id} project={project} active={active === project.id} onSelect={() => onSelect(project.id)} />)}<Sparkles count={reduced ? 25 : 150} scale={10} size={1} speed={reduced ? 0 : .35} color="#00f5ff" /><gridHelper args={[11, 22, '#173b4a', '#101827']} position={[0, -2.1, 0]} /><OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={.25} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.65} /></>
}

export function SpaceProfile() {
  const [entered, setEntered] = useState(false); const [active, setActive] = useState('autismart'); const [reduced, setReduced] = useState(false); const [command, setCommand] = useState(''); const [sound, setSound] = useState(false)
  function toggleSound() { setSound((value) => !value) }
  const current = projects.find((project) => project.id === active) ?? projects[0]
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update) }, [])
  function runCommand(value: string) { const query = value.toLowerCase().trim(); const project = projects.find((item) => query.includes(item.id)); if (project) setActive(project.id); const section = sections.find((item) => query.includes(item[0].toLowerCase())); if (section) document.querySelector(section[2])?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); setCommand('') }
  return <section className={`space-profile cyber-profile ${entered ? 'is-entered' : 'is-landing'}`} aria-label="Interactive portfolio for Syed Muhammad Ali Naqvi">
    <div className="space-topbar cyber-topbar"><a href="#top" className="space-brand"><span>SA</span><b>SYED MUHAMMAD ALI NAQVI / SYS-01</b></a><span className="space-status"><i /> AVAILABLE FOR MEANINGFUL SOFTWARE WORK · 2026</span></div>
    {!entered && <div className="space-landing cyber-landing"><p className="space-kicker">FULL-STACK DEVELOPER · FAST-NUCES BSCS GRADUATE</p><h1>BUILDING SYSTEMS<br /><em>THAT MAKE SENSE.</em></h1><p>Healthcare, education, and operations — practical software built with clear architecture, thoughtful UX, and strong fundamentals.</p><div className="hero-actions"><button className="enter-button" type="button" onClick={() => setEntered(true)}>EXPLORE THE PROFILE <span>↗</span></button><a className="skip-link" href="#about">SKIP TO CONTENT</a></div><small>Drag to orbit · Select a project node · Sound muted by default</small></div>}
    <div className="space-canvas" aria-hidden={!entered}><Canvas camera={{ position: [0, .1, 7.2], fov: 42 }} dpr={[1, 1.5]}><World active={active} onSelect={setActive} reduced={reduced} /></Canvas></div>
    {entered && <><div className="space-hud cyber-hud"><span className="hud-label">ACTIVE PROJECT / {current.type}</span><strong>{current.name}</strong><small>{current.result}</small><div className="hud-rule" /><span>{current.detail}</span><a href={current.link} target="_blank" rel="noopener noreferrer">OPEN PROJECT ↗</a></div><nav className="space-spaces cyber-spaces" aria-label="Portfolio sections">{sections.map(([label, detail, href]) => <a key={label} href={href}>{label}<small>{detail}</small></a>)}</nav><form className="space-command cyber-command" onSubmit={(event) => { event.preventDefault(); runCommand(command) }}><span>›</span><input aria-label="Navigate portfolio" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type: projects / autismart / education / contact" /></form><div className="cyber-actions"><button type="button" onClick={toggleSound} aria-pressed={sound}>{sound ? 'SOUND ON' : 'SOUND MUTED'}</button><button type="button" onClick={() => setEntered(false)}>EXIT PROFILE</button></div></>}
  </section>
}
